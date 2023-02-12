/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import { withRouter } from "react-router-dom";

import ContentWrapper from "component/ContentWrapper";
import Loader from "component/Loader";
import {
    MyAccountOverlay
} from "component/MyAccountOverlay/MyAccountOverlay.component";

import "./CreateAccount.style.scss";

/** @namespace Scandipwa/Route/CreateAccount/Component/CreateAccountComponent */
export class CreateAccountComponent extends MyAccountOverlay {
    classList = cn("CreateAccount");

    renderSignInWrapper() {
        const { onLoginClick } = this.props;

        return (
            <div className={ this.classList("SignInWrapper") }>
                <h3>{ "Registered Customers" }</h3>
                <p>{ "If you have an account, sign in with your email address." }</p>
                <button className="Button" onClick={ onLoginClick }>{ "Sign In" }</button>
            </div>
        );
    }

    renderCreateAccountWrapper() {
        return (
            <div className={ this.classList("CreateAccountWrapper") }>
                <h3>{ "New Customers" }</h3>
                { this.renderCreateAccount(true) }
            </div>
        );
    }

    renderForgotPasswordWrapper() {
        return (
            <div className={ this.classList("ForgetPasswordWrapper") }>
                <h3>{ "Forgot Your Password?" }</h3>
                <p>
                    { "Please enter your email address below to receive a password reset link." }
                </p>
                { this.renderForgotPassword() }
            </div>
        );
    }

    renderContent() {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderCreateAccount();
        }

        return (
            <>
                { this.renderCreateAccountWrapper() }
                { this.renderSignInWrapper() }
            </>
        );
    }

    render() {
        const {
            isLoading
        } = this.props;

        return (
            <ContentWrapper
                label="Create account page"
                mix={ {
                    block: "CreateAccount"
                } }
            >
                <div className={ this.classList("InnerWrapper") }>
                    <Loader isLoading={ isLoading } />
                    { this.renderContent() }
                </div>
            </ContentWrapper>
        );
    }
}
export default withRouter(
    CreateAccountComponent
);
