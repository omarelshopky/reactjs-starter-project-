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
import { customerType } from "type/Account";

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerForm extends FieldForm {
    static propTypes = {
        customer: customerType.isRequired,
        onSave: PropTypes.func.isRequired,
        vatNumberValidation: PropTypes.array.isRequired
    };

    onFormSuccess = (fields) => {
        const { onSave } = this.props;
        onSave(fields);
    };

    getDefaultValues(fieldEntry) {
        const [key] = fieldEntry;
        const { customer: { [key]: value } } = this.props;

        return {
            ...super.getDefaultValues(fieldEntry),
            value
        };
    }

    get fieldMap() {
        return {
            firstname: {
                label: "First name",
                validation: ["notEmpty"]
            },
            lastname: {
                label: "Last name",
                validation: ["notEmpty"]
            }
        };
    }

    renderActions() {
        return (
            <button
                type="submit"
                className={ cn("Button")(null, [cn("MyAccount", "Button")]) }
            >
                { "Save customer" }
            </button>
        );
    }
}

export default MyAccountCustomerForm;
