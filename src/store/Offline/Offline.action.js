/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const SHOW_OFFLINE_NOTICE = "SHOW_OFFLINE_NOTICE";
export const SET_BIG_OFFLINE_NOTICE = "SET_BIG_OFFLINE_NOTICE";

/**
 * Show offline notice.
 * @param  {boolean} msgType
 * @return {void}
 * @namespace Store/Offline/Action/showOfflineNotice
 */
export const showOfflineNotice = (isOffline) => ({
    type: SHOW_OFFLINE_NOTICE,
    isOffline
});

/**
 * Set offline notice size to big.
 * @param  {boolean} isBig
 * @return {void}
 * @namespace Store/Offline/Action/setBigOfflineNotice
 */
export const setBigOfflineNotice = (isBig) => ({
    type: SET_BIG_OFFLINE_NOTICE,
    isBig
});
