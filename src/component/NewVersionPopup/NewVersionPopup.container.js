/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { hideActiveOverlay } from "store/Overlay/Overlay.action";
import { showPopup } from "store/Popup/Popup.action";
import { DeviceType } from "type/Device";
import { isCrawler, isSSR } from "util/Browser";

import NewVersionPopup from "./NewVersionPopup.component";
import { NEW_VERSION_POPUP_ID } from "./NewVersionPopup.config";

/** @namespace Component/NewVersionPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/NewVersionPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(NEW_VERSION_POPUP_ID, payload)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/NewVersionPopup/Container */
export class NewVersionPopupContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    containerFunctions = {
        toggleNewVersion: this.toggleNewVersion.bind(this),
        handleDismiss: this.handleDismiss.bind(this)
    };

    componentDidMount() {
        const { showPopup, goToPreviousHeaderState, device } = this.props;

        if (isCrawler() || isSSR()) {
            // Disable popup for crawlers so page content is not blocked and page is scrollable
            return;
        }

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                showPopup({
                    title: "New version available!"
                });

                if (device.isMobile) {
                    goToPreviousHeaderState();
                }
            });
        }
    }

    toggleNewVersion() {
        window.location.reload();
    }

    handleDismiss() {
        const { hideActiveOverlay } = this.props;

        hideActiveOverlay();
    }

    render() {
        return (
            <NewVersionPopup
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVersionPopupContainer);
