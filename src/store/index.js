/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import ConfigReducer from "store/Config/Config.reducer";
import MetaReducer from "store/Meta/Meta.reducer";
import MyAccountReducer from "store/MyAccount/MyAccount.reducer";
import NavigationReducer from "store/Navigation/Navigation.reducer";
import NotificationReducer from "store/Notification/Notification.reducer";
import OfflineReducer from "store/Offline/Offline.reducer";
import OverlayReducer from "store/Overlay/Overlay.reducer";
import PopupReducer from "store/Popup/Popup.reducer";

/** @namespace Store/Index/getReducers */
export const getStaticReducers = () => ({
    ConfigReducer,
    MetaReducer,
    MyAccountReducer,
    NavigationReducer,
    NotificationReducer,
    OfflineReducer,
    OverlayReducer,
    PopupReducer
});

export default function injectStaticReducers(store) {
    // eslint-disable-next-line no-param-reassign
    store.asyncReducers = [];

    // Inject all the static reducers into the store
    Object.entries(getStaticReducers()).forEach(
        ([name, reducer]) => {
            // eslint-disable-next-line no-param-reassign
            store.asyncReducers[name] = reducer;
            store.injectReducer(name, reducer);
        }
    );

    return store;
}
