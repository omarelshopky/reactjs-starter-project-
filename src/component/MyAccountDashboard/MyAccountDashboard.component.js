/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import { PureComponent } from "react";

import Loader from "component/Loader";
import MyAccountCustomerPopup from "component/MyAccountCustomerPopup";
import MyAccountCustomerTable from "component/MyAccountCustomerTable";
import { customerType } from "type/Account";

import "./MyAccountDashboard.style.scss";

/** @namespace Component/MyAccountDashboard/Component */
export class MyAccountDashboard extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
    };

    classList = cn("MyAccountDashboard");

    renderCustomerPopup() {
        return (
            <MyAccountCustomerPopup />
        );
    }

    renderCustomerTable() {
        const { customer } = this.props;

        return (
            <div className={ this.classList("CustomerData") }>
                <MyAccountCustomerTable
                    customer={ customer }
                    title={ "My profile" }
                />
            </div>
        );
    }

    render() {
        const { customer } = this.props;

        return (
            <div className={ this.classList() }>
                <Loader isLoading={ !Object.keys(customer).length } />
                { this.renderCustomerTable() }
                { this.renderCustomerPopup() }
            </div>
        );
    }
}

export default MyAccountDashboard;
