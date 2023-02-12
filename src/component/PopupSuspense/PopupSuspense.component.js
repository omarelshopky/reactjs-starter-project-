/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import Loader from "component/Loader";
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from "component/MyAccountOverlay/MyAccountOverlay.config";
import Overlay from "component/Overlay";

import { OVERLAY_PLACEHOLDER } from "./PopupSuspense.config";

import "./PopupSuspense.style.scss";
// Import styles from different bundles
import "component/MyAccountOverlay/MyAccountOverlay.style.scss";

/** @namespace Component/PopupSuspense/Component */
export class PopupSuspense extends PureComponent {
    static propTypes = {
        /** Passed props */
        onVisible: PropTypes.func,
        actualOverlayKey: PropTypes.string.isRequired,

        /** Props from global state */
        showOverlay: PropTypes.func.isRequired
    };

    static defaultProps = {
        onVisible: () => {}
    };

    styleMap = {
        [CUSTOMER_ACCOUNT_OVERLAY_KEY]: "MyAccountOverlay"
    };

    componentDidMount() {
        const { showOverlay } = this.props;

        showOverlay(OVERLAY_PLACEHOLDER);
    }

    handleNoStyle() {
        const { actualOverlayKey } = this.props;

        throw new Error(
            `Please, provide a class in the stylemap for overlay ${actualOverlayKey} and import its style here.`
        );
    }

    render() {
        const {
            onVisible,
            actualOverlayKey
        } = this.props;

        const block = this.styleMap[actualOverlayKey];
        if (!block) {
            this.handleNoStyle();
        }

        return (
            <Overlay
                id={ OVERLAY_PLACEHOLDER }
                onVisible={ onVisible }
                mix={ { block, mix: { block: "PopupSuspense" } } }
            >
                <Loader isLoading />
            </Overlay>
        );
    }
}

export default PopupSuspense;
