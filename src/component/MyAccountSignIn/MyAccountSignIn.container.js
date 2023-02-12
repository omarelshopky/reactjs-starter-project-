/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { showNotification } from "store/Notification/Notification.action";
// Import { getErrorMessage } from 'util/Request';

import MyAccountSignIn from "./MyAccountSignIn.component";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Component/MyAccountSignIn/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

/** @namespace Component/MyAccountSignIn/Container/mapDispatchtoProps */
export const mapDispatchToProps = (dispatch) => ({
    signIn: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.signIn(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends PureComponent {
    static propTypes = {
        state: PropTypes.string.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        signIn: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        emailValue: PropTypes.string,
        isEmailAvailable: PropTypes.bool,
        setSignInState: PropTypes.func,
        handleEmailInput: PropTypes.func
    };

    static defaultProps = {
        emailValue: "",
        isEmailAvailable: true,
        setSignInState: () => {},
        handleEmailInput: () => {}
    };

    containerFunctions = {
        onSignInSuccess: this.onSignInSuccess.bind(this),
        onSignInAttempt: this.onSignInAttempt.bind(this)
    };

    componentDidUpdate(prevProps) {
        const { isEmailAvailable, setSignInState } = this.props;
        const { isEmailAvailable: prevIsEmailAvailable } = prevProps;

        if (isEmailAvailable && !prevIsEmailAvailable) {
            setSignInState("");
        }
    }

    containerProps = () => {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            emailValue,
            handleEmailInput
        } = this.props;

        return {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            emailValue,
            handleEmailInput
        };
    };

    async onSignInSuccess(fields) {
        const {
            signIn,
            // ShowNotification,
            onSignIn,
            setLoadingState
        } = this.props;

        try {
            await signIn(fields);
            onSignIn();
        } catch (error) {
            // ShowNotification("error", getErrorMessage(error));
        }

        setLoadingState(false);
    }

    onSignInAttempt() {
        const { setLoadingState } = this.props;
        setLoadingState(true);
    }

    render() {
        return (
            <MyAccountSignIn
                { ...this.containerFunctions }
                { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);
