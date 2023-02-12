/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const UPDATE_CONFIG = "UPDATE_CONFIG";

/** @namespace Store/Config/Action/updateConfig */
export const updateConfig = (config) => ({
    type: UPDATE_CONFIG,
    config
});

export const UPDATE_CONFIG_DEVICE = "UPDATE_CONFIG_DEVICE";

/** @namespace Store/Config/Action/updateConfigDevice */
export const updateConfigDevice = (device) => ({
    type: UPDATE_CONFIG_DEVICE,
    device
});
