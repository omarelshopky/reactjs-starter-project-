/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./OfflineNotice.style.scss";

/** @namespace Component/OfflineNotice/Component */
export class OfflineNotice extends PureComponent {
    static propTypes = {
        isPage: PropTypes.bool.isRequired,
        isBig: PropTypes.bool.isRequired
    };

    classList = cn("OfflineNotice");

    renderLogo() {
        const { isBig } = this.props;

        return (
            <div className={ this.classList("Logo", { isBig }) }>
                <div className={ this.classList("Logo-Cloud") } />
                <div className={ this.classList("Logo-Stick") } />
            </div>
        );
    }

    renderText() {
        const { isBig } = this.props;

        if (isBig) {
            return (
                <div className={ this.classList("Text", {isBig}) }>
                    <p className={ this.classList("Text-Title") }>
                        { "You are currently offline." }
                    </p>
                    <p className={ this.classList("Text-Description") }>
                        { "We could not load the content. Check your internet connection and try again." }
                    </p>
                </div>
            );
        }

        return (
            <div className={ this.classList("Text") }>
                { "Offline mode" }
            </div>
        );
    }

    render() {
        const { isPage, isBig } = this.props;

        if (!isBig && isPage) {
            return null;
        }

        return (
            <div className={ this.classList({isBig}) }>
                { this.renderLogo() }
                { this.renderText() }
            </div>
        );
    }
}

export default OfflineNotice;
