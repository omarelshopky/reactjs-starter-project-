/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const UPDATE_META = "UPDATE_META";

/** @namespace Store/Meta/Action/updateMeta */
export const updateMeta = (metadata) => ({
    type: UPDATE_META,
    payload: metadata
});
