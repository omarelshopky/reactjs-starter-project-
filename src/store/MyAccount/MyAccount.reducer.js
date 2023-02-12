/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { isInitiallySignedIn } from "util/Auth";

import {
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_IS_LOADING,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    UPDATE_CUSTOMER_SIGN_IN_STATUS
} from "./MyAccount.action";

/** @namespace Store/MyAccount/Reducer/getInitialState */
export const getInitialState = () => ({
    isSignedIn: isInitiallySignedIn(),
    passwordResetMessage: "",
    passwordResetStatus: false,
    isPasswordForgotSend: false,
    isLoading: false,
    customer: {},
    message: ""
});

/** @namespace Store/MyAccount/Reducer */
export const MyAccountReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const { status, customer, message } = action;

    switch (action.type) {
    case UPDATE_CUSTOMER_SIGN_IN_STATUS:
        return {
            ...state,
            isSignedIn: status
        };

    case UPDATE_CUSTOMER_PASSWORD_RESET_STATUS:
        return {
            ...state,
            passwordResetStatus: status,
            passwordResetMessage: message
        };

    case UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS:
        return {
            ...state,
            isPasswordForgotSend: !state.isPasswordForgotSend
        };

    case UPDATE_CUSTOMER_DETAILS:
        return {
            ...state,
            customer
        };
    case UPDATE_CUSTOMER_IS_LOADING:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
