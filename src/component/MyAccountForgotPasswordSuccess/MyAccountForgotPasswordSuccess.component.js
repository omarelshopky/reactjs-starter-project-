/* eslint-disable max-len */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import { signInStateType } from "type/Account";

/** @namespace Component/MyAccountForgotPasswordSuccess/Component */
export class MyAccountForgotPasswordSuccess extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        handleSignIn: PropTypes.func.isRequired
    };

    render() {
        const { state, handleSignIn } = this.props;

        return (
            <article
                aria-labelledby="forgot-password-success"
                className={ cn("MyAccountOverlay", "Additional")({ state }) }
            >
                <p id="forgot-password-success">
                    { "If there is an account associated with the provided address you will receive an email with a link to reset your password" }
                </p>
                <button
                    className={ cn("Button") }
                    onClick={ handleSignIn }
                >
                    { "Got it" }
                </button>
            </article>
        );
    }
}

export default MyAccountForgotPasswordSuccess;
