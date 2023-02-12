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

/** @namespace Component/MyAccountConfirmEmail/Component */
export class MyAccountConfirmEmail extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        handleSignIn: PropTypes.func.isRequired
    };

    render() {
        const { state, handleSignIn } = this.props;

        return (
            <article
                aria-labelledby="confirm-email-notice"
                className={ cn("MyAccountOverlay", "Additional")({ state }) }
            >
                <p id="confirm-email-notice">
                    { /* eslint-disable-next-line max-len */ }
                    { "The email confirmation link has been sent to your email. Please confirm your account to proceed." }
                </p>
                <button
                    className="Button"
                    onClick={ handleSignIn }
                >
                    { "Got it" }
                </button>
            </article>
        );
    }
}

export default MyAccountConfirmEmail;
