/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import {
    SET_BIG_OFFLINE_NOTICE,
    SHOW_OFFLINE_NOTICE
} from "./Offline.action";

/** @namespace Store/Offline/Reducer/getInitialState */
export const getInitialState = () => ({
    isOffline: true,
    isBig: false
});

/** @namespace Store/Offline/Reducer */
export const OfflineReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case SHOW_OFFLINE_NOTICE:
        const { isOffline } = action;

        return {
            ...state,
            isOffline
        };
    case SET_BIG_OFFLINE_NOTICE:
        const { isBig } = action;

        return {
            ...state,
            isBig
        };
    default:
        return state;
    }
};

export default OfflineReducer;
