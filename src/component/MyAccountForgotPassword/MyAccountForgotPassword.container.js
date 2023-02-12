/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { STATE_FORGOT_PASSWORD_SUCCESS } from "component/MyAccountOverlay/MyAccountOverlay.config";
import { signInStateType } from "type/Account";

import MyAccountForgotPassword from "./MyAccountForgotPassword.component";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Component/MyAccountForgotPassword/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/MyAccountForgotPassword/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.forgotPassword(options, dispatch)
    )
});

/** @namespace Component/MyAccountForgotPassword/Container */
export class MyAccountForgotPasswordContainer extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        forgotPassword: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        setSignInState: PropTypes.func.isRequired
    };

    containerFunctions = {
        onForgotPasswordAttempt: this.onForgotPasswordAttempt.bind(this),
        onForgotPasswordSuccess: this.onForgotPasswordSuccess.bind(this)
    };

    containerProps = () => {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount
        } = this.props;

        return {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount
        };
    };

    onForgotPasswordAttempt() {
        const { setLoadingState } = this.props;
        setLoadingState(true);
    }

    onForgotPasswordSuccess(fields) {
        const { forgotPassword, setSignInState, setLoadingState } = this.props;

        forgotPassword(fields).then(
            /** @namespace Component/MyAccountOverlay/Container/forgotPasswordThen */
            () => {
                setSignInState(STATE_FORGOT_PASSWORD_SUCCESS);
                setLoadingState(false);
            },
            /** @namespace Component/MyAccountForgotPassword/Container/forgotPasswordThen */
            () => setLoadingState(false)
        );
    }

    render() {
        return (
            <MyAccountForgotPassword
                { ...this.containerFunctions }
                { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountForgotPasswordContainer);
