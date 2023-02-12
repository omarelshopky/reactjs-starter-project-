/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";

import KeyValueTable from "component/KeyValueTable";
import { customerType } from "type/Account";

/** @namespace Component/MyAccountCustomerTable/Component */
export class MyAccountCustomerTable extends KeyValueTable {
    static propTypes = {
        customer: customerType.isRequired,
        showEditPopup: PropTypes.func.isRequired,
        showChangePasswordPopup: PropTypes.func.isRequired
    };

    classList = cn("MyAccountCustomerTable");

    get dataPairArray() {
        const { customer } = this.props;

        return [
            {
                key: "firstname",
                label: "First name",
                source: customer
            },
            {
                key: "lastname",
                label: "Last name",
                source: customer
            },
            {
                key: "email",
                label: "Email",
                source: customer
            }
        ];
    }

    renderActions() {
        const { showChangePasswordPopup, showEditPopup } = this.props;

        return (
            <>
                <button
                    className={ cn("Button")({ isHollow: true }) }
                    onClick={ showEditPopup }
                >
                    { "Edit details" }
                </button>
                <button
                    className={ cn("Button")({ isHollow: true, isWithoutBorder: true }) }
                    onClick={ showChangePasswordPopup }
                >
                    { "Change password" }
                </button>
            </>
        );
    }

    render() {
        return (
            <div className={ this.classList() }>
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountCustomerTable;
