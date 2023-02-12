/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { updateCustomerSignInStatus } from "store/MyAccount/MyAccount.action";
import BrowserDatabase from "util/BrowserDatabase";
import getStore from "util/Store";

export const AUTH_TOKEN = "auth_token";

export const ONE_HOUR = 3600;

/** @namespace Util/Auth/setAuthorizationToken */
export const setAuthorizationToken = (token) => {
    const state = getStore().getState();
    const {
        cookie_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    BrowserDatabase.setItem(token, AUTH_TOKEN, cookie_lifetime);
};

/** @namespace Util/Auth/deleteAuthorizationToken */
export const deleteAuthorizationToken = () => BrowserDatabase.deleteItem(AUTH_TOKEN);

/** @namespace Util/Auth/getAuthorizationToken */
export const getAuthorizationToken = () => BrowserDatabase.getItem(AUTH_TOKEN);

/** @namespace Util/Auth/refreshAuthorizationToken */
export const refreshAuthorizationToken = () => setAuthorizationToken(getAuthorizationToken());

/** @namespace Util/Auth/isInitiallySignedIn */
export const isInitiallySignedIn = () => !!getAuthorizationToken();

/** @namespace Util/Auth/isSignedIn */
export const isSignedIn = () => {
    const _isSignedIn = !!getAuthorizationToken();
    const store = getStore();
    const {
        MyAccountReducer: {
            isSignedIn: isCustomerSignedIn
        } = {}
    } = store.getState();
    const { dispatch } = store;

    if (!_isSignedIn && isCustomerSignedIn) {
        /*
         * Since logout is async and slow, remove cart id
         * and set customer sign in status here on auth token expiration
         */
        dispatch(updateCustomerSignInStatus(false));

        const MyAccountDispatcher = import("../../store/MyAccount/MyAccount.dispatcher");
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, dispatch)
        );
    } else if (_isSignedIn && isCustomerSignedIn) {
        refreshAuthorizationToken();
    }

    return _isSignedIn;
};
