/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import ClickOutside from "component/ClickOutside";
import CloseIcon from "component/CloseIcon";
import NotificationList from "component/NotificationList";
import Overlay from "component/Overlay/Overlay.component";

import { ESCAPE_KEY } from "./Popup.config";

import "./Popup.style.scss";

/** @namespace Component/Popup/Component */
export class Popup extends Overlay {
    static propTypes = {
        ...Overlay.propTypes,
        clickOutside: PropTypes.bool,
        title: PropTypes.string
    };

    static defaultProps = {
        ...Overlay.defaultProps,
        clickOutside: true,
        title: ""
    };

    classList = cn("Popup");

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate(prevProps) {
        const { shouldPopupClose, resetHideActivePopup } = this.props;
        const { shouldPopupClose: prevShouldPopupClose } = prevProps;

        if (shouldPopupClose && shouldPopupClose !== prevShouldPopupClose) {
            this.hidePopUp();
            resetHideActivePopup();
        }

        super.componentDidUpdate(prevProps);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    onVisible() {
        const { onVisible } = this.props;

        this.freezeScroll();
        this.overlayRef.current.focus();

        window.addEventListener("popstate", this.hidePopUp);

        window.history.pushState(
            {
                popupOpen: true
            },
            "",
            `${location.pathname}${location.search}${location.hash}`
        );

        onVisible();
    }

    onHide() {
        const { onHide } = this.props;
        window.removeEventListener("popstate", this.hidePopUp);

        this.unfreezeScroll();

        onHide();
    }

    hidePopUp = () => {
        const { hideActiveOverlay, goToPreviousNavigationState, onClose } = this.props;
        const isVisible = this.getIsVisible();
        if (isVisible) {
            this.unfreezeScroll();
            hideActiveOverlay();
            goToPreviousNavigationState();
            onClose();
        }
    };

    // Same with click outside
    handleClickOutside = () => {
        const { clickOutside } = this.props;
        if (!clickOutside) {
            return;
        }
        this.hidePopUp();
    };

    handleKeyDown = (e) => {
        switch (e.keyCode) {
        case ESCAPE_KEY:
            this.hidePopUp();
            break;
        default:
            break;
        }
    };

    renderTitle() {
        const { title } = this.props;
        if (!title) {
            return null;
        }

        return (
            <h3 className={ this.classList("Heading") }>
                { title }
            </h3>
        );
    }

    renderCloseButton() {
        return (
            <button
                className={ this.classList("CloseBtn") }
                aria-label={ "Close" }
                onClick={ this.hidePopUp }
            >
                <CloseIcon />
            </button>
        );
    }

    renderNotifications() {
        const { isMobile } = this.props;

        if (!isMobile) {
            return null;
        }

        return <NotificationList />;
    }

    renderContent() {
        const { children, contentMix } = this.props;
        const isVisible = this.getIsVisible();

        if (!isVisible) {
            return null;
        }

        const mixClass = cn(contentMix.block);

        return (
            <ClickOutside onClick={ this.handleClickOutside }>
                <div className={ this.classList("Content", null, [mixClass(contentMix.elem, contentMix.mods)]) }>
                    <header className={ this.classList("Header") } >
                        { this.renderTitle() }
                        { this.renderCloseButton() }
                    </header>
                    { this.renderNotifications() }
                    { children }
                </div>
            </ClickOutside>
        );
    }

    render() {
        const { mix, areOtherOverlaysOpen } = this.props;
        const isVisible = this.getIsVisible();

        const mixClass = cn(mix.block);

        return createPortal(
            <div
                ref={ this.overlayRef }
                className={ this.classList(
                    { isVisible, isInstant: areOtherOverlaysOpen },
                    [mixClass(mix.elem, { ...mix.mods, isVisible })]
                ) }
            >
                { this.renderContent() }
            </div>,
            document.body
        );
    }
}

export default Popup;
