/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, PureComponent } from "react";

import { NotificationType } from "type/NotificationList";
import CSS from "util/CSS";

import {
    ANIMATION_DURATION, ERROR_NOTIFICATION_LIFETIME, ERROR_TYPE, NOTIFICATION_LIFETIME
} from "./Notification.config";

import "./Notification.style.scss";

/**
 * Notification block
 * @class Notification
 * @namespace Component/Notification/Component
 */
export class Notification extends PureComponent {
    static propTypes = {
        notificationId: PropTypes.string.isRequired,
        notification: NotificationType.isRequired,
        onHideNotification: PropTypes.func.isRequired,
        lifeTime: PropTypes.number,
        id: PropTypes.string
    };

    static defaultProps = {
        lifeTime: 0,
        id: ""
    };

    state = { isNotificationVisible: true };

    notification = createRef();

    classList = cn("Notification");

    componentDidMount() {
        const { notification: { msgType }, lifeTime } = this.props;

        // Make sure error notification stays a little longer
        if (msgType.toLowerCase() === ERROR_TYPE) {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || ERROR_NOTIFICATION_LIFETIME);
        } else {
            this.hideTimeout = setTimeout(() => this.hideNotification(), lifeTime || NOTIFICATION_LIFETIME);
        }

        CSS.setVariable(this.notification, "animation-duration", `${ANIMATION_DURATION}ms`);
    }

    componentWillUnmount() {
        // Clear started timeouts, to assure we are not changing state of unmounted component
        clearTimeout(this.hideTimeout);
        clearTimeout(this.CSSHideTimeout);
    }

    /**
     * Remove notification from screen
     * @return {void
     */
    hideNotification = () => {
        const { onHideNotification, notificationId } = this.props;
        this.setState({ isNotificationVisible: false });

        // Give CSS time to animate
        this.CSSHideTimeout = setTimeout(() => {
            onHideNotification(notificationId);
        }, ANIMATION_DURATION);
    };

    renderDebug() {
        const { notification: { msgDebug } } = this.props;

        if (!msgDebug) {
            return null;
        }

        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === "production") {
            return null;
        }

        // eslint-disable-next-line no-console
        console.warn(msgDebug); // So we know what was in notification

        return (
            <pre className={ this.classList("Debug") }>
                { JSON.stringify(msgDebug) }
            </pre>
        );
    }

    render() {
        const { notification, id } = this.props;
        const { isNotificationVisible } = this.state;
        const { msgText, msgType } = notification;

        const mods = {
            type: msgType.toLowerCase(),
            is: isNotificationVisible ? "opening" : "closing"
        };

        return (
            <div className={ this.classList(mods) } ref={ this.notification } id={ id }>
                <button className="Notification-Button" onClick={ this.hideNotification }>Close</button>
                <p className="Notification-Text">{ msgText }</p>
                { this.renderDebug() }
            </div>
        );
    }
}

export default Notification;
