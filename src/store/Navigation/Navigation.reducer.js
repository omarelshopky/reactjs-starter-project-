/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import {
    DEFAULT_STATE
} from "component/NavigationAbstract/NavigationAbstract.container";

import {
    CHANGE_NAVIGATION_STATE,
    GOTO_PREVIOUS_NAVIGATION_STATE
} from "./Navigation.action";

export const TOP_NAVIGATION_TYPE = "TOP_NAVIGATION_TYPE";
export const BOTTOM_NAVIGATION_TYPE = "BOTTOM_NAVIGATION_TYPE";

/** @namespace Store/Navigation/Reducer/getInitialState */
export const getInitialState = () => ({
    [TOP_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    },
    [BOTTOM_NAVIGATION_TYPE]: {
        navigationState: DEFAULT_STATE,
        navigationStateHistory: [DEFAULT_STATE]
    }
});

/** @namespace Store/Navigation/Reducer */
export const NavigationReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const { navigationType, navigationState } = action;

    const {
        [navigationType]: {
            navigationStateHistory,
            navigationState: prevNavigationState
        } = {}
    } = state;

    switch (action.type) {
    case CHANGE_NAVIGATION_STATE:
        const { name: nextName, force = false } = navigationState;
        const { name: prevName } = prevNavigationState;

        if (nextName === prevName && !force) {
            navigationStateHistory[navigationStateHistory.length - 1] = navigationState;
        } else {
            navigationStateHistory.push(navigationState);
        }

        return {
            ...state,
            [navigationType]: {
                navigationStateHistory,
                navigationState
            }
        };

    case GOTO_PREVIOUS_NAVIGATION_STATE:
        navigationStateHistory.pop();
        const newNavigationState = navigationStateHistory.slice(-1)[0];

        if (!newNavigationState) {
            return state;
        }

        return {
            ...state,
            [navigationType]: {
                navigationStateHistory,
                navigationState: newNavigationState
            }
        };

    default:
        return state;
    }
};

export default NavigationReducer;
