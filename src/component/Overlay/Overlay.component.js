/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, PureComponent } from "react";
import { createPortal } from "react-dom";

import { ChildrenType, MixType } from "type/Common";
import { toggleScroll } from "util/Browser";

import "./Overlay.style.scss";

/** @namespace Component/Overlay/Component */
export class Overlay extends PureComponent {
    static propTypes = {
        mix: MixType,
        id: PropTypes.string.isRequired,
        onVisible: PropTypes.func,
        onHide: PropTypes.func,
        activeOverlay: PropTypes.string.isRequired,
        areOtherOverlaysOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        isRenderInPortal: PropTypes.bool,
        children: ChildrenType,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        mix: {},
        children: [],
        onVisible: () => {},
        isStatic: false,
        onHide: () => {},
        isRenderInPortal: true
    };

    overlayRef = createRef();

    classList = cn("Overlay");

    componentDidUpdate(prevProps) {
        const prevWasVisible = this.getIsVisible(prevProps);
        const isVisible = this.getIsVisible();
        if (isVisible && !prevWasVisible) {
            this.onVisible();
        }
        if (!isVisible && prevWasVisible) {
            this.onHide();
        }
    }

    onVisible() {
        const { onVisible, isStatic, isMobile } = this.props;
        if (isStatic) {
            return;
        }
        if (isMobile) {
            this.freezeScroll();
        }
        this.overlayRef.current.focus();
        onVisible();
    }

    onHide() {
        const { onHide, isStatic, isMobile } = this.props;
        if (isStatic) {
            return;
        }
        if (isMobile) {
            this.unfreezeScroll();
        }
        onHide();
    }

    getIsVisible(props = this.props) {
        const { id, activeOverlay, isStatic } = props;

        return isStatic || id === activeOverlay;
    }

    freezeScroll() {
        this.YoffsetWhenScrollDisabled = window.pageYOffset || document.body.scrollTop;
        toggleScroll(false);
        document.body.style.marginTop = `${-this.YoffsetWhenScrollDisabled}px`;
    }

    unfreezeScroll() {
        toggleScroll(true);
        document.body.style.marginTop = 0;
        window.scrollTo(0, this.YoffsetWhenScrollDisabled);
    }

    renderInMobilePortal(content) {
        const { isStatic, isRenderInPortal, isMobile } = this.props;

        if (!isStatic && isMobile && isRenderInPortal) {
            return createPortal(content, document.body);
        }

        return content;
    }

    render() {
        const {
            children,
            mix,
            areOtherOverlaysOpen,
            isStatic
        } = this.props;

        const isVisible = this.getIsVisible();
        const mixClass = cn(mix.block);

        return this.renderInMobilePortal(
            <div
                className={ this.classList(
                    { isVisible, isStatic, isInstant: areOtherOverlaysOpen },
                    [mixClass(mix.elem, {...mix.mods, isVisible})]) }
                ref={ this.overlayRef }
            >
                { children && children }
            </div>
        );
    }
}

export default Overlay;
