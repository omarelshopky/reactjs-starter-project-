/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { ERROR_TYPE } from "component/Notification/Notification.config";
import { updateMeta } from "store/Meta/Meta.action";
import { showNotification } from "store/Notification/Notification.action";
import { LocationType } from "type/Router";
import { convertQueryStringToKeyValuePairs } from "util/Url";

import ConfirmAccountPage from "./ConfirmAccountPage.component";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Route/ConfirmAccountPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/ConfirmAccountPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    confirmAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.confirmAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    )
});

/** @namespace Route/ConfirmAccountPage/Container */
export class ConfirmAccountPageContainer extends PureComponent {
    static propTypes = {
        location: LocationType.isRequired,
        signIn: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        confirmAccount: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    containerFunctions = {
        onConfirmAttempt: this.onConfirmAttempt.bind(this),
        onConfirmSuccess: this.onConfirmSuccess.bind(this),
        onFormError: this.onFormError.bind(this)
    };

    constructor(props) {
        super(props);

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            redirect: false,
            isLoading: false
        };
    }

    componentDidMount() {
        const { updateMeta } = this.props;
        updateMeta({ title: "Confirm account" });
    }

    containerProps() {
        const { redirect, isLoading } = this.state;

        return {
            redirect,
            isLoading,
            shouldDisplayWarning: this.shouldDisplayWarning()
        };
    }

    shouldDisplayWarning() {
        const {
            location: {
                search
            }
        } = this.props;
        const { email, key } = convertQueryStringToKeyValuePairs(search);

        return !(email && key);
    }

    onConfirmAttempt() {
        this.setState({ isLoading: true });
    }

    onConfirmSuccess(fields) {
        const {
            location: { search },
            confirmAccount,
            signIn
        } = this.props;

        const { password } = fields;

        const options = convertQueryStringToKeyValuePairs(search);
        const { email } = options;

        confirmAccount({ ...options, password })
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThen */
                (data) => {
                    const { msgType } = data || {};

                    if (msgType === ERROR_TYPE) {
                        /*
                         * Error message is handled in the dispatcher
                         * just abort the chain
                         */
                        return Promise.reject();
                    }

                    return signIn({ email, password });
                }
            )
            .then(
                /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThenThen */
                () => this.setState({ redirect: true })
            )
            .catch(
                /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThenThenCatch */
                () => this.setState({ isLoading: false })
            );
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <ConfirmAccountPage
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPageContainer);
