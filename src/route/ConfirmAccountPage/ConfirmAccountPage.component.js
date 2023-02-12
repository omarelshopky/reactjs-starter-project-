/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { Redirect } from "react-router";

import ContentWrapper from "component/ContentWrapper";
import Field from "component/Field";
import Form from "component/Form";
import Loader from "component/Loader";
import { isSignedIn } from "util/Auth";

import "./ConfirmAccountPage.style.scss";

/** @namespace Route/ConfirmAccountPage/Component */
export class ConfirmAccountPage extends PureComponent {
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        shouldDisplayWarning: PropTypes.bool.isRequired,
        onConfirmAttempt: PropTypes.func.isRequired,
        onConfirmSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired
    };

    classList = cn("ConfirmAccountPage");

    renderWarningMessage() {
        const { shouldDisplayWarning } = this.props;

        if (!shouldDisplayWarning) {
            return null;
        }

        return (
            <div className={ this.classList("WarningMsg") }>
                <h2>
                    { "Unable to confirm account" }
                </h2>
                <div>
                    { "The URL is invalid. Some parameters are missing." }
                </div>
            </div>
        );
    }

    renderForm() {
        const {
            onConfirmAttempt,
            onConfirmSuccess,
            onFormError
        } = this.props;

        // TODO: use FieldForm instead!!!

        return (
            <Form
                mix={ { block: "ConfirmAccountPage", elem: "Form" } }
                key="confirm-account"
                onSubmit={ onConfirmAttempt }
                onSubmitSuccess={ onConfirmSuccess }
                onSubmitError={ onFormError }
            >
                { /*
                    Added email field with display:none to fix warning
                    `Password forms should have (optionally hidden) username fields for accessibility`
                */ }
                <Field
                    type="email"
                    label={ "Email" }
                    id="email"
                    name="email"
                    mix={ { block: "ConfirmAccountPage", elem: "EmailInput" } }
                />
                <Field
                    type="password"
                    label={ "Password" }
                    id="password"
                    name="password"
                    placeholder={ "Enter your password" }
                    validation={ ["notEmpty", "password"] }
                />
                <button
                    type="submit"
                    className={ cn("Button")(null, [this.classList("Button")]) }
                >
                    { "Confirm your account" }
                </button>
            </Form>
        );
    }

    renderPageContents() {
        const { shouldDisplayWarning } = this.props;

        if (shouldDisplayWarning) {
            return null;
        }

        return (
            <>
                <h1 className={ this.classList("Heading") }>
                    { "Confirm your account" }
                </h1>
                { this.renderForm() }
            </>
        );
    }

    render() {
        const {
            redirect,
            isLoading
        } = this.props;

        if (redirect || isSignedIn()) {
            return <Redirect to="/my-account/dashboard" />;
        }

        return (
            <main className={ this.classList() } aria-label={ "Confirm Account Page" }>
                <ContentWrapper
                    wrapperMix={ { block: "ConfirmAccountPage", elem: "Wrapper" } }
                    label={ "Confirm Account Action" }
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderWarningMessage() }
                    { this.renderPageContents() }
                </ContentWrapper>
            </main>
        );
    }
}

export default ConfirmAccountPage;
