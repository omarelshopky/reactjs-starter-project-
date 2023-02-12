/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import Notification from "component/Notification";
import { NotificationListType } from "type/NotificationList";

import "./NotificationList.style.scss";

/**
 * Notification List
 * @class NotificationList
 * @namespace Component/NotificationList/Component
 */
export class NotificationList extends PureComponent {
    static propTypes = {
        notifications: NotificationListType.isRequired,
        onHideNotification: PropTypes.func.isRequired
    };

    render() {
        const { onHideNotification, notifications } = this.props;

        return (
            <div className="NotificationList">
                { Object.keys(notifications).map((id) => (
                    <Notification
                        key={ id }
                        notificationId={ id }
                        notification={ notifications[id] }
                        onHideNotification={ onHideNotification }
                    />
                )) }
            </div>
        );
    }
}

export default NotificationList;
