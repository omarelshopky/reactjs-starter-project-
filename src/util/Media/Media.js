/* eslint-disable camelcase */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import getStore from "util/Store";

export const WYSIWYG_MEDIA = "wysiwyg/";
export const LOGO_MEDIA = "logo/";

export default (src, subPath = "", isMediaPath = true) => {
    // If isMediaPath is passed return local media path

    const { ConfigReducer: { secure_base_media_url, base_url } } = getStore().getState();
    const baseUrl = isMediaPath
        ? secure_base_media_url || "/media/"
        : base_url;

    return `${ baseUrl }${ subPath }${ src }`;
};
