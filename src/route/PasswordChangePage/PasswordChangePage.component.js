/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import ContentWrapper from "component/ContentWrapper";
import Field from "component/Field";
import Form from "component/Form";
import Loader from "component/Loader";

import "./PasswordChangePage.style.scss";

/** @namespace Route/PasswordChangePage/Component */
export class PasswordChangePage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onPasswordAttempt: PropTypes.func.isRequired,
        onPasswordSuccess: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    };

    classList = cn("PasswordChangePage");

    renderForm() {
        const {
            onPasswordAttempt,
            onPasswordSuccess,
            onError
        } = this.props;

        // TODO: use FieldForm instead!!!

        return (
            <Form
                key="reset-password"
                onSubmit={ onPasswordAttempt }
                onSubmitSuccess={ onPasswordSuccess }
                onSubmitError={ onError }
            >
                <Field
                    type="password"
                    label={ "New password" }
                    id="password"
                    name="password"
                    autocomplete="new-password"
                    validation={ ["notEmpty", "password"] }
                />
                <Field
                    type="password"
                    label={ "Confirm password" }
                    id="password_confirmation"
                    name="password_confirmation"
                    autocomplete="new-password"
                    validation={ ["notEmpty", "password", "password_match"] }
                />
                <div className={ cn("MyAccount", "Buttons")() }>
                    <button
                        type="submit"
                        className={ this.classList("Button", null, [cn("Button")()]) }
                    >
                        { "Update Password" }
                    </button>
                </div>
            </Form>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main className={ this.classList("Button") } aria-label={ "Password Change Page" }>
                <ContentWrapper
                    mix={ { block: "PasswordChangePage" } }
                    wrapperMix={ { block: "PasswordChangePage", elem: "Wrapper" } }
                    label={ "Password Change Actions" }
                >
                    <Loader isLoading={ isLoading } />
                    <h1>{ "Change My Password" }</h1>
                    { this.renderForm() }
                </ContentWrapper>
            </main>
        );
    }
}

export default PasswordChangePage;
