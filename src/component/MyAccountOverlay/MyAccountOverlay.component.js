/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import Loader from "component/Loader";
import MyAccountConfirmEmail from "component/MyAccountConfirmEmail";
import MyAccountCreateAccount from "component/MyAccountCreateAccount";
import MyAccountForgotPassword from "component/MyAccountForgotPassword";
import MyAccountForgotPasswordSuccess from "component/MyAccountForgotPasswordSuccess";
import MyAccountSignIn from "component/MyAccountSignIn";
import Overlay from "component/Overlay";
import { signInStateType } from "type/Account";

import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    STATE_CONFIRM_EMAIL,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from "./MyAccountOverlay.config";

import "./MyAccountOverlay.style.scss";

/** @namespace Component/MyAccountOverlay/Component */
export class MyAccountOverlay extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        isOverlayVisible: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        state: signInStateType.isRequired,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        onVisible: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        onSignIn: PropTypes.func.isRequired
    };

    static defaultProps = {
        isCheckout: false
    };

    renderMap = {
        [STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: "Sign in to your account"
        },
        [STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: "Get password link"
        },
        [STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess()
        },
        [STATE_CREATE_ACCOUNT]: {
            render: () => this.renderCreateAccount(),
            title: "Create new account"
        },
        [STATE_LOGGED_IN]: {
            render: () => {}
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: "Confirm the email"
        }
    };

    classList = cn("MyAccountOverlay");

    renderMyAccount() {
        const { state } = this.props;
        const { render, title } = this.renderMap[state];

        return (
            <div className={ this.classList("Action", { state }) }>
                <p className={ this.classList("Heading") }>{ title }</p>
                { render() }
            </div>
        );
    }

    renderConfirmEmail() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
                state={ state }
                handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword() {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState
        } = this.props;

        return (
            <MyAccountForgotPassword
                state={ state }
                onFormError={ onFormError }
                handleSignIn={ handleSignIn }
                handleCreateAccount={ handleCreateAccount }
                setLoadingState={ setLoadingState }
                setSignInState={ setSignInState }
            />
        );
    }

    renderForgotPasswordSuccess() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
                state={ state }
                handleSignIn={ handleSignIn }
            />
        );
    }

    renderCreateAccount(isLandingPage = false) {
        const {
            state,
            handleSignIn,
            setSignInState,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountCreateAccount
                state={ state }
                handleSignIn={ handleSignIn }
                setLoadingState={ setLoadingState }
                setSignInState={ setSignInState }
                onSignIn={ onSignIn }
                isLandingPage={ isLandingPage }
            />
        );
    }

    renderSignIn() {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
                state={ state }
                onFormError={ onFormError }
                handleForgotPassword={ handleForgotPassword }
                handleCreateAccount={ handleCreateAccount }
                setLoadingState={ setLoadingState }
                onSignIn={ onSignIn }
            />
        );
    }

    render() {
        const {
            isLoading,
            onVisible,
            isMobile
        } = this.props;

        return (
            <Overlay
                id={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
                mix={ { block: "MyAccountOverlay" } }
                onVisible={ onVisible }
                isStatic={ isMobile }
            >
                <Loader isLoading={ isLoading } />
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

export default withRouter(
    MyAccountOverlay
);
