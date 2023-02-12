/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";

import FieldForm from "component/FieldForm";

/** @namespace Component/MyAccountPasswordForm/Component */
export class MyAccountPasswordForm extends FieldForm {
    static propTypes = {
        onPasswordChange: PropTypes.func.isRequired
    };

    onFormSuccess = (fields) => {
        const { onPasswordChange } = this.props;
        onPasswordChange(fields);
    };

    get fieldMap() {
        return {
            currentPassword: {
                type: "password",
                label: "Current Password",
                validation: ["notEmpty"]
            },
            newPassword: {
                type: "password",
                label: "New password",
                validation: ["notEmpty"]
            }
        };
    }

    renderActions() {
        return (
            <button className={ cn("Button")(null, [cn("MyAccount", "Button")]) } >
                { "Change password" }
            </button>
        );
    }
}

export default MyAccountPasswordForm;
