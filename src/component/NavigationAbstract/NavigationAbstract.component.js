/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { Component } from "react";

import { DEFAULT_STATE_NAME } from "./NavigationAbstract.config";

/** @namespace Component/NavigationAbstract/Component */
export class NavigationAbstract extends Component {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        navigationState: PropTypes.object.isRequired
    };

    defaultStateName = DEFAULT_STATE_NAME;

    stateMap = {
        [DEFAULT_STATE_NAME]: {}
    };

    renderMap = {};

    renderNavigationState() {
        const { navigationState: { name, hiddenElements = [] } } = this.props;

        // Get current page/state render methods
        const source = this.stateMap[name]
            ? this.stateMap[name]
            : this.stateMap[this.defaultStateName];

        /*
         * Return defined render methods for current page/state
         * * Don't render methods which ids are passed inside hiddenElements
         */
        return Object.entries(this.renderMap).map(
            ([key, renderFunction]) => renderFunction(source[key] && !hiddenElements.includes(key), key)
        );
    }

    // eslint-disable-next-line react/require-render-return
    render() {
        throw new Error("Please redefine \"render\" method.");
    }
}

export default NavigationAbstract;
