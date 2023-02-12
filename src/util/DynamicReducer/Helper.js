/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

/**
 * @param store
 * @param reducers
 */
export default function injectToReducers(store, reducers) {
    Object.keys(reducers).forEach((key) => {
        if (!Reflect.has(store.asyncReducers, key)) {
            // eslint-disable-next-line no-param-reassign
            store.asyncReducers[key] = reducers[key];
            store.injectReducer(key, reducers[key]);
        }
    });
}
