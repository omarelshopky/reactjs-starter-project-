/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { SHOW_POPUP } from "store/Popup/Popup.action";

import {
    HIDE_ACTIVE_OVERLAY,
    TOGGLE_OVERLAY
} from "./Overlay.action";

/** @namespace Store/Overlay/Reducer/getInitialState */
export const getInitialState = () => ({
    activeOverlay: "",
    areOtherOverlaysOpen: false
});

/** @namespace Store/Overlay/Reducer */
export const OverlayReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const { overlayKey } = action;
    const {
        activeOverlay: prevActiveOverlay
    } = state;

    switch (action.type) {
    case TOGGLE_OVERLAY:
    case SHOW_POPUP:
        const activeOverlay = prevActiveOverlay === overlayKey ? "" : overlayKey;
        const areOtherOverlaysOpen = prevActiveOverlay !== "";

        return {
            ...state,
            activeOverlay,
            areOtherOverlaysOpen
        };

    case HIDE_ACTIVE_OVERLAY:
        return {
            ...state,
            activeOverlay: "",
            areOtherOverlaysOpen: false
        };

    default:
        return state;
    }
};

export default OverlayReducer;
