/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import Link from "component/Link";
import BrowserDatabase from "util/BrowserDatabase";
import { ONE_MONTH_IN_SECONDS } from "util/Request/Request.config";

import { COOKIE_POPUP } from "./CookiePopup.config";

import "./CookiePopup.style.scss";

/** @namespace Component/CookiePopup/Component */
export class CookiePopup extends PureComponent {
    static propTypes = {
        cookieText: PropTypes.string.isRequired,
        cookieLink: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
    };

    state = {
        isAccepted: this.getAcceptCookieValue()
    };

    classList = cn("CookiePopup");

    getAcceptCookieValue() {
        const { code } = this.props;
        const param = `${ COOKIE_POPUP }_${ code }`;

        return !!BrowserDatabase.getItem(param);
    }

    acceptCookies = () => {
        const { code } = this.props;
        const param = `${ COOKIE_POPUP }_${ code }`;

        BrowserDatabase.setItem(true, param, ONE_MONTH_IN_SECONDS);
        this.setState({ isAccepted: true });
    };

    renderCookieLink() {
        const { cookieLink } = this.props;

        if (!cookieLink) {
            return null;
        }

        return (
            <Link
                className={ this.classList("Link") }
                to={ cookieLink }
            >
                { "View cookie policy" }
            </Link>
        );
    }

    renderCookieText() {
        const { cookieText } = this.props;

        return (
            <p className={ this.classList("Content") }>
                { cookieText }
                { this.renderCookieLink() }
            </p>
        );
    }

    renderCTA() {
        return (
            <div
                className={ this.classList("CTA") }
                onClick={ this.acceptCookies }
                onKeyDown={ this.acceptCookies }
                role="button"
                tabIndex={ 0 }
            >
                { "Got it" }
            </div>
        );
    }

    render() {
        const { cookieText } = this.props;
        const { isAccepted } = this.state;

        if (!cookieText || isAccepted) {
            return null;
        }

        return (
            <div className={ this.classList() }>
                { this.renderCookieText() }
                { this.renderCTA() }
            </div>
        );
    }
}

export default CookiePopup;
