/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

/**
 * Show notification (append to notification to global notification map).
 * @param  {String} msgType
 * @param  {String} msgText
 * @param  {any} msgDebug
 * @return {void}
 * @namespace Store/Notification/Action/showNotification
 */
export const showNotification = (msgType, msgText, msgDebug) => ({
    type: SHOW_NOTIFICATION,
    msgType,
    msgText,
    msgDebug
});

/**
 * Hide notification with specific id (drop notification from global list).
 * @param  {number} id
 * @return {void}
 * @namespace Store/Notification/Action/hideNotification
 */
export const hideNotification = (id) => ({
    type: HIDE_NOTIFICATION,
    id
});
