/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./Notification.action";

/** @namespace Store/Notification/Reducer/getInitialState */
export const getInitialState = () => ({
    notifications: {}
});

/** @namespace Store/Notification/Reducer */
export const NotificationReducer = (
    // eslint-disable-next-line default-param-last
    state = getInitialState(),
    action
) => {
    const notifications = { ...state.notifications };

    switch (action.type) {
    case SHOW_NOTIFICATION:
        const { msgType, msgText, msgDebug } = action;
        notifications[Date.now()] = { msgType, msgText, msgDebug };

        return {
            ...state,
            notifications
        };

    case HIDE_NOTIFICATION:
        // eslint-disable-next-line no-unused-vars
        const { [action.id]: id, ...shownNotifications } = notifications;

        return {
            ...state,
            notifications: shownNotifications
        };

    default:
        return state;
    }
};

export default NotificationReducer;
