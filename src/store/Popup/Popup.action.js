/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const SHOW_POPUP = "SHOW_POPUP";

/** @namespace Store/Popup/Action/showPopup */
export const showPopup = (overlayKey, payload) => ({
    type: SHOW_POPUP,
    overlayKey,
    payload: { [overlayKey]: payload }
});
