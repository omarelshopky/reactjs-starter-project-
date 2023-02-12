/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import BrowserDatabase from "util/BrowserDatabase";

import { UPDATE_CONFIG, UPDATE_CONFIG_DEVICE } from "./Config.action";

export const MAX_WIDTH = 150;
export const MAX_HEIGHT = 40;

/** @namespace Store/Config/Reducer/filterStoreConfig */
export const filterStoreConfig = (config) => Object.entries(config).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {}
);

export const {
    countries, reviewRatings, storeConfig, currencyData, cartDisplayConfig
} = BrowserDatabase.getItem("config") || {
    countries: [],
    storeConfig: {}
};

/** @namespace Store/Config/Reducer/getCheckoutAgreementData */
export const getCheckoutAgreementData = (base, state) => (base || state.checkoutAgreements || {});

/** @namespace Store/Config/Reducer/getInitialState */
export const getInitialState = () => ({
    ...filterStoreConfig(storeConfig),
    isLoading: true,
    device: {
        isMobile: true,
        android: true,
        ios: false,
        blackberry: false,
        opera: false,
        windows: false,
        standaloneMode: window.matchMedia("(display-mode: standalone)").matches
    }
});

/** @namespace Store/Config/Reducer */
export const ConfigReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const {
        type,
        config: {
            storeConfig = {}
        } = {},
        device
    } = action;

    switch (type) {
    case UPDATE_CONFIG:
        const filteredStoreConfig = filterStoreConfig(storeConfig);
        const { secure_base_media_url } = filteredStoreConfig;
        window.secure_base_media_url = secure_base_media_url;

        return {
            ...state,
            ...filteredStoreConfig,
            /*
             * Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
             * and header_logo_src takes old value
             */
            isLoading: false,
            cartDisplayConfig
        };

    case UPDATE_CONFIG_DEVICE:
        return {
            ...state,
            device: {
                ...state.device,
                ...device
            }
        };

    default:
        return state;
    }
};

export default ConfigReducer;
