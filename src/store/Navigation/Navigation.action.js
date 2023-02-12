/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

export const CHANGE_NAVIGATION_STATE = "CHANGE_NAVIGATION_STATE";
export const GOTO_PREVIOUS_NAVIGATION_STATE = "GOTO_PREVIOUS_NAVIGATION_STATE";

/** @namespace Store/Navigation/Action/changeNavigationState */
export const changeNavigationState = (navigationType, navigationState) => ({
    type: CHANGE_NAVIGATION_STATE,
    navigationType,
    navigationState
});

/** @namespace Store/Navigation/Action/goToPreviousNavigationState */
export const goToPreviousNavigationState = (navigationType) => ({
    type: GOTO_PREVIOUS_NAVIGATION_STATE,
    navigationType
});
