/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";
export const HIDE_ACTIVE_OVERLAY = "HIDE_ACTIVE_OVERLAY";
export const HIDE_ACTIVE_POPUP = "HIDE_ACTIVE_POPUP";

/** @namespace Store/Overlay/Action/toggleOverlayByKey */
export const toggleOverlayByKey = (overlayKey) => ({
    type: TOGGLE_OVERLAY,
    overlayKey
});

/** @namespace Store/Overlay/Action/hideActiveOverlay */
export const hideActiveOverlay = () => ({
    type: HIDE_ACTIVE_OVERLAY
});

/** @namespace Store/Overlay/Action/hideActivePopup */
export const hideActivePopup = (shouldPopupClose = true) => ({
    type: HIDE_ACTIVE_POPUP,
    payload: shouldPopupClose
});
