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

/** @namespace Component/MyAccountForgotPassword/Component */
export class MyAccountForgotPassword extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        onForgotPasswordSuccess: PropTypes.func.isRequired,
        onForgotPasswordAttempt: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired
    };

    renderForgotPasswordForm() {
        const { onForgotPasswordAttempt, onForgotPasswordSuccess, onFormError } = this.props;

        return (
            <Form
                key="forgot-password"
                onSubmit={ onForgotPasswordAttempt }
                onSubmitSuccess={ onForgotPasswordSuccess }
                onSubmitError={ onFormError }
            >
                <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder={ "Your email address" }
                    label={ "Email" }
                    autocomplete="email"
                    validation={ ["notEmpty", "email"] }
                />
                <div className={ cn("MyAccountOverlay", "Buttons")() }>
                    <button
                        className={ cn("Button")(null, [cn("MyAccountOverlay", "ResetPassword")]) }
                        type="submit"
                    >
                        { "Send reset link" }
                    </button>
                </div>
            </Form>
        );
    }

    renderCreateAccountLabel() {
        const { handleCreateAccount } = this.props;

        return (
            <section aria-labelledby="create-account-label">
                <h4 id="create-account-label">{ "Don't have an account?" }</h4>
                <button
                    className={ cn("Button")({ likeLink: true }) }
                    onClick={ handleCreateAccount }
                >
                    { "Create an account" }
                </button>
            </section>
        );
    }

    renderAdditionalField() {
        const { state, handleSignIn } = this.props;

        return (
            <article className={ cn("MyAccountOverlay", "Additional")({ state }) }  >
                <section aria-labelledby="forgot-password-labe">
                    <h4 id="forgot-password-label">{ "Already have an account?" }</h4>
                    <button
                        className={ cn("Button")({ likeLink: true }, [cn("MyAccountOverlay", "SignInButton")]) }
                        onClick={ handleSignIn }
                    >
                        { "Sign in" }
                    </button>
                </section>
                { this.renderCreateAccountLabel() }
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderForgotPasswordForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountForgotPassword;
