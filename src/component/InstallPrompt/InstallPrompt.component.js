/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import InstallPromptAndroid from "component/InstallPromptAndroid";
import InstallPromptIOS from "component/InstallPromptIOS";
import { DeviceType } from "type/Device";

import "./InstallPrompt.style.scss";

/** @namespace Component/InstallPrompt/Component */
export class InstallPrompt extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isBannerClosed: PropTypes.bool.isRequired,
        hasInstallPromptEvent: PropTypes.bool.isRequired,
        containerFunctions: PropTypes.object.isRequired
    };

    /**
     * Currently BeforeInstallPromptEvent is supported only on
     * - Android webview
     * - Chrome for Android
     * - Samsung Internet
     * But iOS has own "Add to Home Screen button" on Safari share menu
     */
    hasSupport() {
        const { device, hasInstallPromptEvent, isBannerClosed } = this.props;
        const {
            android,
            ios,
            safari,
            standaloneMode
        } = device;
        const isAndroid = android && hasInstallPromptEvent;
        const isIos = ios && safari;

        return (isAndroid || isIos)
            && !standaloneMode
            && !isBannerClosed;
    }

    renderPrompt() {
        const {
            device,
            containerFunctions: {
                handleAppInstall,
                handleBannerClose
            }
        } = this.props;

        if (device.ios) {
            return (
                <InstallPromptIOS
                    handleAppInstall={ handleAppInstall }
                    handleBannerClose={ handleBannerClose }
                />
            );
        }

        if (device.android) {
            return (
                <InstallPromptAndroid
                    handleAppInstall={ handleAppInstall }
                    handleBannerClose={ handleBannerClose }
                />
            );
        }

        return null;
    }

    render() {
        const displayComponent = this.hasSupport();

        if (!displayComponent) {
            return null;
        }

        return (
            <div className="InstallPrompt">
                { this.renderPrompt() }
            </div>
        );
    }
}

export default InstallPrompt;
