/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./InstallPromptIOS.style.scss";

/** @namespace Component/InstallPromptIOS/Component */
export class InstallPromptIOS extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired
    };

    classList = cn("InstallPromptIOS");

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
                className={ this.classList("Close") }
                onClick={ handleBannerClose }
            >
                { "Maybe later" }
            </button>
        );
    }

    renderContent() {
        return (
            <p className={ this.classList("Content") }>
                <span>{ "Tap:" }</span>
                <span className={ this.classList("Share") } />
                <span>{ ", then" }</span>
                <span className={ this.classList("Plus") } />
                <span>{ "Add to Home Screen" }</span>
            </p>
        );
    }

    renderHeading() {
        return (
            <p className={ this.classList("Heading") }>
                { "Browse website in full-screen:" }
            </p>
        );
    }

    render() {
        return (
            <div className={ this.classList() }>
                { this.renderHeading() }
                { this.renderContent() }
                { this.renderCloseButton() }
            </div>
        );
    }
}

export default InstallPromptIOS;
