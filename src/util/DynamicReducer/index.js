/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import React from "react";

import injectReducers from "util/DynamicReducer/Helper";
import getStore from "util/Store";

export const withReducers = (reducers) => (WrappedComponent) => {
    const injectAndExecute = (props) => {
        injectReducers(getStore(), reducers);

        return <WrappedComponent { ...props } />;
    };

    return injectAndExecute;
};

export default { withReducers };
