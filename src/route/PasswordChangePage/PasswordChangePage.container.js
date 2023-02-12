/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { updateMeta } from "store/Meta/Meta.action";
import { showNotification } from "store/Notification/Notification.action";
import { LocationType } from "type/Common";
import { getQueryParam } from "util/Url";

import PasswordChangePage from "./PasswordChangePage.component";
import {
    STATUS_PASSWORD_MISS_MATCH,
    STATUS_PASSWORD_UPDATED
} from "./PasswordChangePage.config";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Route/PasswordChangePage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus,
    passwordResetMessage: state.MyAccountReducer.passwordResetMessage
});

/** @namespace Route/PasswordChangePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    resetPassword(options) {
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.resetPassword(options, dispatch)
        );
    },
    updateCustomerPasswordResetStatus(options) {
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateCustomerPasswordResetStatus(options, dispatch)
        );
    },
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

/** @namespace Route/PasswordChangePage/Container */
export class PasswordChangePageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        passwordResetStatus: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        passwordResetMessage: PropTypes.string.isRequired,
        resetPassword: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    state = {
        passwordResetStatus: "",
        isLoading: false
    };

    static getDerivedStateFromProps(props) {
        const {
            passwordResetStatus,
            passwordResetMessage,
            showNotification
        } = props;
        const stateToBeUpdated = {};

        if (passwordResetStatus) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.passwordResetStatus = passwordResetStatus;

            switch (passwordResetStatus) {
            case STATUS_PASSWORD_UPDATED:
                showNotification("success", "Password has been successfully updated!");
                break;
            case STATUS_PASSWORD_MISS_MATCH:
                showNotification("info", "Your password and confirmation password do not match.");
                break;
            default:
                showNotification("error", passwordResetMessage);
            }
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    containerFunctions = {
        onPasswordAttempt: this.onPasswordAttempt.bind(this),
        onPasswordSuccess: this.onPasswordSuccess.bind(this),
        onError: this.onError.bind(this)
    };

    componentDidMount() {
        this.updateMeta();
    }

    containerProps = () => {
        const { isLoading } = this.state;

        return { isLoading };
    };

    onPasswordSuccess(fields) {
        const { resetPassword, location } = this.props;
        const { password, password_confirmation } = fields;
        const token = getQueryParam("token", location);

        resetPassword({ token, password, password_confirmation });
    }

    onPasswordAttempt() {
        this.setState({ isLoading: true });
    }

    onError() {
        this.setState({ isLoading: false });
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: "Password Change Page" });
    }

    render() {
        const { passwordResetStatus } = this.state;

        if (passwordResetStatus === STATUS_PASSWORD_UPDATED) {
            return <Redirect to="/" />;
        }

        return (
            <PasswordChangePage
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePageContainer);
