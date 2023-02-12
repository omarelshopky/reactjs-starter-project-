/* eslint-disable default-param-last */
/* eslint-disable no-unused-vars */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { MY_ACCOUNT } from "component/Header/Header.config";
// Import MyAccountQuery from 'Query/MyAccount.query';
import {
    updateCustomerDetails,
    updateCustomerPasswordForgotStatus,
    updateCustomerPasswordResetStatus,
    updateCustomerSignInStatus,
    updateIsLoading
} from "store/MyAccount/MyAccount.action";
import { goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { showNotification } from "store/Notification/Notification.action";
import { hideActiveOverlay } from "store/Overlay/Overlay.action";
import {
    deleteAuthorizationToken,
    isSignedIn,
    setAuthorizationToken
} from "util/Auth";
import BrowserDatabase from "util/BrowserDatabase";
import history from "util/History";
// Import { executePost, fetchMutation, getErrorMessage } from 'util/Request';


export const CUSTOMER = "customer";

export const ONE_MONTH_IN_SECONDS = 2628000;

/**
 * My account actions
 * @class MyAccount
 * @namespace Store/MyAccount/Dispatcher
 */
export class MyAccountDispatcher {
    forceLogoutRedirectPages = [
        MY_ACCOUNT
    ];

    requestCustomerData(dispatch) {
        // Const query = MyAccountQuery.getCustomerQuery();

        // const customer = BrowserDatabase.getItem(CUSTOMER) || {};
        // if (customer.id) {
        //     dispatch(updateCustomerDetails(customer));
        // }

        // return executePost(prepareQuery([query])).then(
        //     /** @namespace Store/MyAccount/Dispatcher/requestCustomerDataExecutePostThen */
        //     ({ customer }) => {
        //         dispatch(updateCustomerDetails(customer));
        //         BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
        //     },
        //     /** @namespace Store/MyAccount/Dispatcher/requestCustomerDataExecutePostError */
        //     (error) => dispatch(showNotification("error", getErrorMessage(error)))
        // );
    }

    // eslint-disable-next-line default-param-last
    logout(authTokenExpired = false, dispatch) {
        // If (authTokenExpired) {
        //     dispatch(showNotification("error", __("Your session is over, you are logged out!")));
        //     this.handleForceRedirectToLoginPage();
        // } else {
        //     deleteAuthorizationToken();
        //     dispatch(showNotification("success", __("You are successfully logged out!")));
        // }

        // BrowserDatabase.deleteItem(CUSTOMER);
        // removeUid();

        // dispatch(updateCustomerSignInStatus(false));
        // dispatch(updateCustomerDetails({}));

        // dispatch(updateCustomerDetails({}));
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    forgotPassword(options = {}, dispatch) {
        // Const mutation = MyAccountQuery.getForgotPasswordMutation(options);

        // return fetchMutation(mutation).then(
        //     /** @namespace Store/MyAccount/Dispatcher/forgotPasswordFetchMutationThen */
        //     () => dispatch(updateCustomerPasswordForgotStatus()),
        //     /** @namespace Store/MyAccount/Dispatcher/forgotPasswordFetchMutationError */
        //     (error) => dispatch(showNotification("error", getErrorMessage(error)))
        // );
    }

    /**
     * Reset password action
     * @param {{token: String, password: String, password_confirmation: String}} [options={}]
     * @returns {Promise<{status: String}>} Reset password token
     * @memberof MyAccountDispatcher
     */
    resetPassword(options = {}, dispatch) {
        // Const mutation = MyAccountQuery.getResetPasswordMutation(options);

        // return fetchMutation(mutation).then(
        //     /** @namespace Store/MyAccount/Dispatcher/resetPasswordFetchMutationThen */
        //     ({ s_resetPassword: { status } }) => dispatch(updateCustomerPasswordResetStatus(status)),
        //     /** @namespace Store/MyAccount/Dispatcher/resetPasswordFetchMutationError */
        //     (errors) => dispatch(updateCustomerPasswordResetStatus("error", getErrorMessage(errors)))
        // );
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    createAccount(options = {}, dispatch) {
        // Const { customer: { email }, password } = options;
        // const mutation = MyAccountQuery.getCreateAccountMutation(options);
        // dispatch(updateIsLoading(true));

        // return fetchMutation(mutation).then(
        //     /** @namespace Store/MyAccount/Dispatcher/createAccountFetchMutationThen */
        //     (data) => {
        //         const { createCustomer: { customer } } = data;
        //         const { confirmation_required } = customer;

        //         if (confirmation_required) {
        //             dispatch(updateIsLoading(false));

        //             return 2;
        //         }

        //         return this.signIn({ email, password }, dispatch);
        //     },

        //     /** @namespace Store/MyAccount/Dispatcher/createAccountFetchMutationError */
        //     (error) => {
        //         dispatch(updateIsLoading(false));
        //         dispatch(showNotification("error", getErrorMessage(error)));
        //         Promise.reject();

        //         return false;
        //     }
        // );
    }

    /**
     * Confirm account action
     * @param {{key: String, email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    confirmAccount(options = {}, dispatch) {
        // Const mutation = MyAccountQuery.getConfirmAccountMutation(options);

        // return fetchMutation(mutation).then(
        //     /** @namespace Store/MyAccount/Dispatcher/confirmAccountFetchMutationThen */
        //     () => dispatch(showNotification("success", __("Your account is confirmed!"))),
        //     /** @namespace Store/MyAccount/Dispatcher/confirmAccountFetchMutationError */
        //     (error) => dispatch(
        //         showNotification(
        //             "error",
        //             getErrorMessage(error, __("Something went wrong! Please, try again!"))
        //         )
        //     )
        // );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccountDispatcher
     */
    async signIn(options = {}, dispatch) {
        // Const mutation = MyAccountQuery.getSignInMutation(options);

        // const result = await fetchMutation(mutation);
        // const { generateCustomerToken: { token } } = result;

        // setAuthorizationToken(token);

        // await this.requestCustomerData(dispatch);

        // dispatch(updateCustomerSignInStatus(true));
        // dispatch(updateIsLoading(false));
        // dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE));
        // dispatch(hideActiveOverlay());
        // dispatch(showNotification("success", __("You are successfully logged in!")));

        // return true;
    }

    handleForceRedirectToLoginPage() {
        const { location: { pathname = "" } = {} } = history;
        const doRedirect = this.forceLogoutRedirectPages.reduce((result, urlPart) => {
            if (pathname.includes(urlPart)) {
                return true;
            }

            return result;
        }, false);

        if (doRedirect) {
            history.push({ pathname: "/account/login" });
        }
    }

    handleCustomerDataOnInit(dispatch) {
        if (isSignedIn()) {
            return;
        }

        BrowserDatabase.deleteItem(CUSTOMER);
    }
}

export default new MyAccountDispatcher();
