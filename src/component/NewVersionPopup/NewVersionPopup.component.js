/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import Popup from "component/Popup";

import { NEW_VERSION_POPUP_ID } from "./NewVersionPopup.config";

import "./NewVersionPopup.style.scss";

/** @namespace Component/NewVersionPopup/Component */
export class NewVersionPopup extends PureComponent {
    static propTypes = {
        toggleNewVersion: PropTypes.func.isRequired,
        handleDismiss: PropTypes.func.isRequired
    };

    classList = cn("NewVersionPopup");

    renderHeading() {
        return (
            <h3 className={ this.classList("Heading") }>
                { "New version available!" }
            </h3>
        );
    }

    renderNotice() {
        return (
            <p>
                { "We have updated the website. Reload is required to apply changes." }
            </p>
        );
    }

    renderReloadThePageButton() {
        const { toggleNewVersion } = this.props;

        return (
            <button
                className={ this.classList("ReloadButton", null, [cn("Button")]) }
                onClick={ toggleNewVersion }
            >
                { "Reload the page" }
            </button>
        );
    }

    renderDismissButton() {
        const { handleDismiss } = this.props;

        return (
            <button
                className={ cn("Button", "isLikeLink")(null, [this.classList("DismissButton")]) }
                onClick={ handleDismiss }
            >
                { "Dismiss" }
            </button>
        );
    }

    renderButtons() {
        return (
            <div className={ this.classList("Buttons") }>
                { this.renderReloadThePageButton() }
                { this.renderDismissButton() }
            </div>
        );
    }

    renderContent() {
        return (
            <div className={ this.classList("Content") }>
                { this.renderHeading() }
                { this.renderNotice() }
                { this.renderButtons() }
            </div>
        );
    }

    render() {
        return (
            <Popup
                id={ NEW_VERSION_POPUP_ID }
                clickOutside={ false }
                mix={ { block: "NewVersionPopup" } }
            >
                { this.renderContent() }
            </Popup>
        );
    }
}

export default NewVersionPopup;
