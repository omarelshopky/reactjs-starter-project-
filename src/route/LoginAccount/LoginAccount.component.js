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

import "./LoginAccount.style.scss";

/** @namespace Scandipwa/Route/LoginAccount/Component/LoginAccountComponent */
export class LoginAccountComponent extends MyAccountOverlay {
    classList = cn("LoginAccount");

    renderSignInWrapper() {
        const { isMobile } = this.props;

        if (isMobile) {
            return this.renderSignIn();
        }

        return (
            <div className={ this.classList("SignInWrapper") }>
                <h3>{ "Registered Customers" }</h3>
                <p>{ "If you have an account, sign in with your email address." }</p>
                { this.renderSignIn() }
            </div>
        );
    }

    renderCreateAccountWrapper() {
        const { isMobile, onCreateAccountClick } = this.props;

        if (isMobile) {
            return (
                <div className={ this.classList("CreateAccount") }>
                    <h4>{ "Don't have an account?" }</h4>
                    <button
                        className={ cn("Button")({ likeLink: true }) }
                        onClick={ onCreateAccountClick }
                    >
                        { "Create an Account" }
                    </button>
                </div>
            );
        }

        return (
            <div className={ this.classList("CreateAccount") }>
                <h3>{ "New Customers" }</h3>
                <p>
                    { "Creating an account has many benefits:" }
                    { " check out faster, keep more than one address, track orders and more." }
                </p>
                <button className="Button" onClick={ onCreateAccountClick }>{ "Create an Account" }</button>
            </div>
        );
    }

    renderContent() {
        return (
            <>
                { this.renderSignInWrapper() }
                { this.renderCreateAccountWrapper() }
            </>
        );
    }

    render() {
        const {
            isLoading
        } = this.props;

        return (
            <ContentWrapper
                mix={ {
                    block: "LoginAccount"
                } }
                label="Login page"
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
    LoginAccountComponent
);
