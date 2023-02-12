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

import CloseIcon from "component/CloseIcon";

import "./InstallPromptAndroid.style.scss";

/** @namespace Component/InstallPromptAndroid/Component */
export class InstallPromptAndroid extends PureComponent {
    static propTypes = {
        handleBannerClose: PropTypes.func.isRequired,
        handleAppInstall: PropTypes.func.isRequired
    };

    classList = cn("InstallPromptAndroid");

    renderCloseButton() {
        const { handleBannerClose } = this.props;

        return (
            <button
                className={ this.classList("Close") }
                onClick={ handleBannerClose }
                aria-label={ "Close" }
            >
                <CloseIcon />
            </button>
        );
    }

    renderContent() {
        return (
            <p className={ this.classList("Content") }>
                { "Add website to your home screen for the full-screen browsing experience!" }
            </p>
        );
    }

    renderInstallButton() {
        const { handleAppInstall } = this.props;

        return (
            <button
                className={ this.classList("Button", null, [cn("Button")]) }
                onClick={ handleAppInstall }
            >
                { "Add to home screen" }
            </button>
        );
    }

    render() {
        return (
            <div className={ this.classList() }>
                { this.renderCloseButton() }
                { this.renderContent() }
                { this.renderInstallButton() }
            </div>
        );
    }
}

export default InstallPromptAndroid;
