/* eslint-disable no-param-reassign */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { combineReducers, createStore } from "redux";

/**
 * Configure the store
 * @namespace Store/Index/configureStore
 */
export function configureStore(store) {
    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    /*
     * Create an inject reducer function
     * This function adds the async reducer, and creates a new combined reducer
     */
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(combineReducers(store.asyncReducers));
    };

    // Return the modified store
    return store;
}

export const noopReducer = (state) => state;

export const getStore = (() => {
    // Initialize the store
    const store = configureStore(createStore(
        noopReducer,
        ( // Enable Redux dev-tools only in development
            // eslint-disable-next-line no-undef
            process.env.NODE_ENV === "development"
            && window.__REDUX_DEVTOOLS_EXTENSION__
        ) && window.__REDUX_DEVTOOLS_EXTENSION__({
            trace: true
        })
    ));

    return function storeGetter() {
        return store;
    };
})();

export default getStore;
