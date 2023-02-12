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
import history from "util/History";

import "./MyAccountCreateAccount.style.scss";

/** @namespace Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccount extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        onCreateAccountAttempt: PropTypes.func.isRequired,
        onCreateAccountSuccess: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        isSubscriptionSelected: PropTypes.bool.isRequired,
        onSubscriptionChange: PropTypes.func.isRequired,
        isSubmitted: PropTypes.bool.isRequired
    };

    renderSubscribeToNewsletter() {
        const { onSubscriptionChange, isSubscriptionSelected, isSubmitted } = this.props;

        return (
            <Field
                type="checkbox"
                value="is_subscribed"
                label={ "Subscribe to newsletter" }
                id="is_subscribed"
                mix={ { block: "MyAccountOverlay", elem: "Checkbox" } }
                name="is_subscribed"
                onChange={ onSubscriptionChange }
                checked={ isSubscriptionSelected }
                validateSeparately
                isSubmitted={ isSubmitted }
            />
        );
    }

    renderCreateAccountPersonalInfoFields() {
        const { isSubmitted } = this.props;
        const { location: { state: { firstName = "", lastName = "" } = {} } } = history;

        return (
            <fieldset className={ cn("MyAccountOverlay", "Legend")() }>
                <legend>{ "Personal Information" }</legend>
                <Field
                    type="text"
                    label={ "First Name" }
                    id="firstname"
                    name="firstname"
                    placeholder={ "Your first name" }
                    value={ firstName }
                    autocomplete="given-name"
                    validation={ ["notEmpty"] }
                    validateSeparately
                    isSubmitted={ isSubmitted }
                />
                <Field
                    type="text"
                    label={ "Last Name" }
                    id="lastname"
                    name="lastname"
                    placeholder={ "Your last name" }
                    value={ lastName }
                    autocomplete="family-name"
                    validation={ ["notEmpty"] }
                    validateSeparately
                    isSubmitted={ isSubmitted }
                />
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields() {
        const { isSubmitted } = this.props;
        const { location: { state: { email = "" } = {} } } = history;

        return (
            <fieldset className={ cn("MyAccountOverlay", "Legend")() }>
                <legend>{ "Sign-Up Information" }</legend>
                <Field
                    type="email"
                    label={ "Email" }
                    id="email"
                    name="email"
                    placeholder={ "Your email address" }
                    value={ email }
                    autocomplete="email"
                    validation={ ["notEmpty", "email"] }
                    validateSeparately
                    isSubmitted={ isSubmitted }
                />
                <div className={ cn("MyAccountOverlay", "PasswordBlock")() }>
                    <Field
                        type="password"
                        label={ "Password" }
                        id="password"
                        name="password"
                        placeholder={ "Enter your password" }
                        autocomplete="new-password"
                        validation={ ["notEmpty", "password"] }
                        validateSeparately
                        isSubmitted={ isSubmitted }
                    />
                    <Field
                        type="password"
                        label={ "Confirm password" }
                        id="confirm_password"
                        name="confirm_password"
                        placeholder={ "Retype your password" }
                        autocomplete="new-password"
                        validation={ ["notEmpty", "password", "password_match"] }
                        validateSeparately
                        isSubmitted={ isSubmitted }
                    />
                </div>
            </fieldset>
        );
    }

    renderSubmitButton() {
        return (
            <div className={ cn("MyAccountOverlay", "Buttons")() }>
                <button
                    className={ cn("Button")(null, [cn("MyAccountOverlay", "SignUpButton")()]) }
                    type="submit"
                >
                    { "Sign up" }
                </button>
            </div>
        );
    }

    renderCreateAccountForm() {
        const { onCreateAccountAttempt, onCreateAccountSuccess } = this.props;

        return (
            <Form
                key="create-account"
                onSubmit={ onCreateAccountAttempt }
                onSubmitSuccess={ onCreateAccountSuccess }
                onSubmitError={ onCreateAccountAttempt }
            >
                { this.renderCreateAccountPersonalInfoFields() }
                { this.renderCreateAccountSignUpInfoFields() }
                { this.renderSubmitButton() }
            </Form>
        );
    }

    renderAdditionalField() {
        const { state, handleSignIn } = this.props;

        return (
            <article className={ cn("MyAccountOverlay", "Additional")({ state }) }>
                <section>
                    <h4>{ "Already have an account?" }</h4>
                    <button
                        className={ cn("Button")({ likeLink: true }, [cn("MyAccountOverlay", "SignInLink")]) }
                        onClick={ handleSignIn }
                    >
                        { "Sign in" }
                    </button>
                </section>
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderCreateAccountForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountCreateAccount;
