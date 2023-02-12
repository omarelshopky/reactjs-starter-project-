/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import Field from "component/Field";
import Form from "component/Form";
import { signInStateType } from "type/Account";

import "./MyAccountSignIn.style.scss";

/** @namespace Component/MyAccountSignIn/Component */
export class MyAccountSignIn extends PureComponent {
    static propTypes = {
        onSignInSuccess: PropTypes.func.isRequired,
        onSignInAttempt: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        state: signInStateType.isRequired,
        emailValue: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func
    };

    static defaultProps = {
        handleEmailInput: () => {}
    };

    renderSignInForm() {
        const {
            onSignInAttempt,
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            emailValue,
            handleEmailInput
        } = this.props;

        return (
            <Form
                key="sign-in"
                onSubmit={ onSignInAttempt }
                onSubmitSuccess={ onSignInSuccess }
                onSubmitError={ onFormError }
            >
                <Field
                    type="email"
                    label={ "Email" }
                    id="email"
                    name="email"
                    placeholder={ "Your email address" }
                    value={ emailValue }
                    autocomplete={ "email" }
                    validation={ ["notEmpty", "email"] }
                    onChange={ handleEmailInput }
                />
                <Field
                    type="password"
                    label={ "Password" }
                    id="password"
                    name="password"
                    placeholder={ "Enter your password" }
                    autocomplete="current-password"
                    validation={ ["notEmpty", "password"] }
                />
                <button
                    type="button"
                    className={ cn("Button")({ likeLink: true }, [cn("MyAccountOverlay", "ForgotPassword")]) }
                    onClick={ handleForgotPassword }
                >
                    { "Forgot password?" }
                </button>
                <div className={ cn("MyAccountOverlay", "SignInButton")() }>
                    <button className={ cn("Button")() }>{ "Sign in" }</button>
                </div>
            </Form>
        );
    }

    renderAdditionalField() {
        const {
            handleCreateAccount,
            state
        } = this.props;

        return (
            <article className={ cn("MyAccountOverlay", "Additional")({ state }) }>
                <section>
                    <h4 id="forgot-password-label">{ "Don't have an account?" }</h4>
                    <button
                        className={ cn("Button")({ likeLink: true }) }
                        onClick={ handleCreateAccount }
                    >
                        { "Create an account" }
                    </button>
                </section>
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderSignInForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountSignIn;
