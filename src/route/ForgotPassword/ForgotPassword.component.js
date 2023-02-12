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

import "./ForgotPassword.style.scss";

/** @namespace Scandipwa/Route/ForgotPassword/Component/ForgotPasswordComponent */
export class ForgotPasswordComponent extends MyAccountOverlay {
    classList = cn("ForgotPassword");

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
        const { onCreateAccountClick } = this.props;

        return (
            <div className={ this.classList("CreateAccountWrapper") }>
                <h3>{ "New Customers" }</h3>
                <p>
                    { "Creating an account has many benefits:" }
                    { " check out faster, keep more than one address, track orders and more." }
                </p>
                <button className="Button" onClick={ onCreateAccountClick }>{ "Create an Account" }</button>
            </div>
        );
    }

    renderForgotPasswordWrapper() {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderForgotPassword();
        }

        return (
            <div className={ this.classList("ContainerWrapper") }>
                <h3>{ "Forgot Your Password?" }</h3>
                <p>
                    { "Please enter your email address below to receive a password reset link." }
                </p>
                { this.renderForgotPassword() }
            </div>
        );
    }

    renderAdditionalContent() {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <div className={ this.classList("AdditionalContent") }>
                { this.renderCreateAccountWrapper() }
                { this.renderSignInWrapper() }
            </div>
        );
    }

    render() {
        const {
            isLoading
        } = this.props;

        return (
            <ContentWrapper
                mix={ {
                    block: "ForgotPassword"
                } }
                label="Forgot password page"
            >
                <div className={ this.classList("InnerWrapper") }>
                    <Loader isLoading={ isLoading } />
                    { this.renderForgotPasswordWrapper() }
                    { this.renderAdditionalContent() }
                </div>
            </ContentWrapper>
        );
    }
}
export default withRouter(
    ForgotPasswordComponent
);
