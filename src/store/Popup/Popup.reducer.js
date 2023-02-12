/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { HIDE_ACTIVE_OVERLAY, HIDE_ACTIVE_POPUP } from "store/Overlay/Overlay.action";

import { SHOW_POPUP } from "./Popup.action";

/** @namespace Store/Popup/Reducer/getInitialState */
export const getInitialState = () => ({
    popupPayload: {},
    shouldPopupClose: false
});

/** @namespace Store/Popup/Reducer */
export const PopupReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const { payload, type } = action;

    switch (type) {
    case SHOW_POPUP:
        return { ...state, popupPayload: payload };
    case HIDE_ACTIVE_OVERLAY:
        return { ...state, popupPayload: {} };
    case HIDE_ACTIVE_POPUP:
        return { ...state, shouldPopupClose: payload };
    default:
        return state;
    }
};

export default PopupReducer;
