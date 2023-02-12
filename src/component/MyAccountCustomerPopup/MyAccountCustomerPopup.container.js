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

// Import MyAccountQuery from 'Query/MyAccount.query';
import { updateCustomerDetails } from "store/MyAccount/MyAccount.action";
// Import { CUSTOMER } from "store/MyAccount/MyAccount.dispatcher";
import { goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { showNotification } from "store/Notification/Notification.action";
import { hideActiveOverlay } from "store/Overlay/Overlay.action";
import { customerType } from "type/Account";
// Import { isSignedIn } from "util/Auth";
// import BrowserDatabase from "util/BrowserDatabase";
// // Import { fetchMutation, getErrorMessage } from 'Util/Request';
// import { ONE_MONTH_IN_SECONDS } from "util/Request/Request.config";

import MyAccountCustomerPopup from "./MyAccountCustomerPopup.component";
import { CHANGE_PASSWORD, CUSTOMER_POPUP_ID, EDIT_CUSTOMER } from "./MyAccountCustomerPopup.config";

/** @namespace Component/MyAccountCustomerPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    payload: state.PopupReducer.popupPayload[CUSTOMER_POPUP_ID] || {}
});

/** @namespace Component/MyAccountCustomerPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateCustomer: (customer) => dispatch(updateCustomerDetails(customer)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    // ShowErrorNotification: (error) => dispatch(showNotification("error", getErrorMessage(error))),
    showSuccessNotification: (message) => dispatch(showNotification("success", message)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/MyAccountCustomerPopup/Container */
export class MyAccountCustomerPopupContainer extends PureComponent {
    static propTypes = {
        updateCustomer: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired,
        payload: PropTypes.shape({
            action: PropTypes.oneOf([
                CHANGE_PASSWORD,
                EDIT_CUSTOMER
            ]),
            customer: customerType
        }).isRequired
    };

    state = {
        isLoading: false
    };

    containerFunctions = {
        onCustomerSave: this.onCustomerSave.bind(this),
        onPasswordChange: this.onPasswordChange.bind(this)
    };

    containerProps() {
        const { payload } = this.props;
        const { isLoading } = this.state;

        return {
            payload,
            isLoading
        };
    }

    onError = (error) => {
        const { showErrorNotification } = this.props;
        this.setState({ isLoading: false });
        showErrorNotification(error);
    };

    // eslint-disable-next-line no-unused-vars
    onCustomerSave(customer) {
        /*
         * Const {
         *     updateCustomer,
         *     hideActiveOverlay,
         *     goToPreviousHeaderState
         * } = this.props;
         */

        /*
         * if (!isSignedIn()) {
         *     return null;
         * }
         */

        // // const mutation = MyAccountQuery.getUpdateInformationMutation(customer);
        // this.setState({ isLoading: true });

        // return fetchMutation(mutation).then(
        //     /** @namespace Component/MyAccountCustomerPopup/Container/onCustomerSaveFetchMutationThen */
        //     ({ updateCustomer: { customer } }) => {
        //         BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
        //         updateCustomer(customer);
        //         this.setState({ isLoading: false }, () => {
        //             hideActiveOverlay();
        //             goToPreviousHeaderState();
        //         });
        //     },
        //     this.onError
        // );
    }

    // eslint-disable-next-line no-unused-vars
    onPasswordChange(passwords) {
        /*
         * Const {
         *     showSuccessNotification,
         *     hideActiveOverlay,
         *     goToPreviousHeaderState
         * } = this.props;
         */

        /*
         * if (!isSignedIn()) {
         *     return null;
         * }
         */

        /*
         * const mutation = MyAccountQuery.getChangeCustomerPasswordMutation(passwords);
         * this.setState({ isLoading: true });
         */

        // return fetchMutation(mutation).then(
        //     /** @namespace Component/MyAccountCustomerPopup/Container/onPasswordChangeFetchMutationThen */
        //     () => {
        //         showSuccessNotification(__("Your password was successfully updated!"));
        //         this.setState({ isLoading: false }, () => {
        //             hideActiveOverlay();
        //             goToPreviousHeaderState();
        //         });
        //     },
        //     this.onError
        // );
    }

    render() {
        return (
            <MyAccountCustomerPopup
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCustomerPopupContainer);
