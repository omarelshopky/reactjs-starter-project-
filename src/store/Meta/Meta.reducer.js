/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { UPDATE_META } from "./Meta.action";

export const updateEveryTime = [
    "title",
    "description",
    "keywords",
    "canonical_url",
    "robots",
    "status_code"
];

/** @namespace Store/Meta/Reducer/filterData */
export const filterData = (data) => {
    const updated = updateEveryTime.reduce((acc, key) => {
        acc[key] = data[key];

        return acc;
    }, {});

    return { ...data, ...updated };
};

/** @namespace Store/Meta/Reducer/getInitialState */
export const getInitialState = () => ({
    title: "",
    title_prefix: "",
    title_suffix: "",
    description: "",
    keywords: "",
    canonical_url: "",
    robots: "",
    status_code: ""
});

/** @namespace Store/Meta/Reducer */
export const MetaReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const { payload = {}, type } = action;

    switch (type) {
    case UPDATE_META:
        const filteredData = filterData(payload);

        return {
            ...state,
            ...filteredData
        };

    default:
        return state;
    }
};

export default MetaReducer;
