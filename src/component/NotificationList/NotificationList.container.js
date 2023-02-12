/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { connect } from "react-redux";

import { hideNotification } from "store/Notification/Notification.action";
import NotificationReducer from "store/Notification/Notification.reducer";
import { withReducers } from "util/DynamicReducer";

import NotificationList from "./NotificationList.component";

/** @namespace Component/NotificationList/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    notifications: state.NotificationReducer.notifications
});

/** @namespace Component/NotificationList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    onHideNotification: (id) => {
        dispatch(hideNotification(id));
    }
});

export default withReducers({
    NotificationReducer
})(connect(mapStateToProps, mapDispatchToProps)(NotificationList));
