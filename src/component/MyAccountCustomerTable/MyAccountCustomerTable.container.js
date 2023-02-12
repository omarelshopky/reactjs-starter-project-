/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import {
    CHANGE_PASSWORD,
    CUSTOMER_POPUP_ID,
    EDIT_CUSTOMER
} from "component/MyAccountCustomerPopup/MyAccountCustomerPopup.config";
import { showPopup } from "store/Popup/Popup.action";
import { customerType } from "type/Account";

import MyAccountCustomerTable from "./MyAccountCustomerTable.component";

/** @namespace Component/MyAccountCustomerTable/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/MyAccountCustomerTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(CUSTOMER_POPUP_ID, payload))
});

/** @namespace Component/MyAccountCustomerTable/Container */
export class MyAccountCustomerTableContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        customer: customerType.isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: ""
    };

    containerFunctions = {
        showEditPopup: this.showEditPopup.bind(this),
        showChangePasswordPopup: this.showChangePasswordPopup.bind(this)
    };

    containerProps() {
        const {
            customer,
            title
        } = this.props;

        return {
            customer,
            title
        };
    }

    showEditPopup() {
        const { showPopup, customer } = this.props;

        showPopup({
            action: EDIT_CUSTOMER,
            customer,
            title: "Edit customer details"
        });
    }

    showChangePasswordPopup() {
        const { showPopup, customer } = this.props;

        showPopup({
            action: CHANGE_PASSWORD,
            customer,
            title: "Change password"
        });
    }

    render() {
        return (
            <MyAccountCustomerTable
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerTableContainer);
