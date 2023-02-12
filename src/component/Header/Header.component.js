/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, lazy, Suspense } from "react";

import ChevronIcon from "component/ChevronIcon";
import { LEFT } from "component/ChevronIcon/ChevronIcon.config";
import ClickOutside from "component/ClickOutside";
import CloseIcon from "component/CloseIcon";
import Link from "component/Link";
import Logo from "component/Logo";
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from "component/MyAccountOverlay/MyAccountOverlay.config";
import NavigationAbstract from "component/NavigationAbstract/NavigationAbstract.component";
import { DEFAULT_STATE_NAME } from "component/NavigationAbstract/NavigationAbstract.config";
import OfflineNotice from "component/OfflineNotice";
import PopupSuspense from "component/PopupSuspense";
import UserIcon from "component/UserIcon";
import { DeviceType } from "type/Device";
import { isSignedIn } from "util/Auth";
import { isCrawler, isSSR } from "util/Browser";
import CSS from "util/CSS";
import media from "util/Media";
import { LOGO_MEDIA } from "util/Media/Media";

import {
    CMS_PAGE,
    CONTACT_US,
    CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE,
    CUSTOMER_SUB_ACCOUNT,
    NO_MATCH,
    POPUP
} from "./Header.config";

import "./Header.style.scss";

// eslint-disable-next-line max-len
export const MyAccountOverlay = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "overlay" */ "component/MyAccountOverlay"));

/** @namespace Component/Header/Component */
export class Header extends NavigationAbstract {
    static propTypes = {
        navigationState: PropTypes.object.isRequired,
        onBackButtonClick: PropTypes.func.isRequired,
        onCloseButtonClick: PropTypes.func.isRequired,
        onMyAccountButtonClick: PropTypes.func.isRequired,
        onEditButtonClick: PropTypes.func.isRequired,
        onOkButtonClick: PropTypes.func.isRequired,
        onCancelButtonClick: PropTypes.func.isRequired,
        onMyAccountOutsideClick: PropTypes.func.isRequired,
        isClearEnabled: PropTypes.bool.isRequired,
        header_logo_src: PropTypes.string,
        logo_alt: PropTypes.string,
        logo_height: PropTypes.number,
        logo_width: PropTypes.number,
        isLoading: PropTypes.bool,
        showMyAccountLogin: PropTypes.bool,
        onSignIn: PropTypes.func,
        // hideActiveOverlay: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        logo_alt: "Starter logo",
        logo_height: 25,
        logo_width: 200,
        showMyAccountLogin: false,
        header_logo_src: "",
        isLoading: true
    };

    logoRef = createRef();

    stateMap = {
        [DEFAULT_STATE_NAME]: {
            title: true,
            logo: true
        },
        [NO_MATCH]: {
            title: true
        },
        [POPUP]: {
            title: true,
            close: true
        },
        [CUSTOMER_ACCOUNT]: {
            title: true
        },
        [CUSTOMER_SUB_ACCOUNT]: {
            title: true,
            back: true
        },
        [CUSTOMER_ACCOUNT_PAGE]: {
            title: true
        },
        [CMS_PAGE]: {
            back: true,
            title: true
        },
        [CONTACT_US]: {
            title: true,
            back: true
        }
    };

    renderMap = {
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        account: this.renderAccount.bind(this),
        ok: this.renderOkButton.bind(this)
    };

    classList = cn("Header");

    /*
     * PureComponent suits perfectly for current component, as changes in almost all props (7+) need to trigger rerender.
     * Yet shouldComponentUpdate() is overridden in another component also extending NavigationAbstract
     * (i.e. NavigationTabs) to minimize rerenders. => We can't extend PureComponent from Header.
     * This is why shallow comparison behavior for all props  (like in PureComponent) is used here.
     */
    shouldComponentUpdate(nextProps) {
        return Object.keys(nextProps).some((key) => nextProps[key] !== this.props[key]);
    }

    renderBackButton(isVisible = false) {
        const { onBackButtonClick, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <button
                key="back"
                className={ this.classList("Button", { type: "back", isVisible }) }
                onClick={ onBackButtonClick }
                aria-label="Go back"
                aria-hidden={ !isVisible }
                tabIndex={ isVisible ? 0 : -1 }
            >
                <ChevronIcon direction={ LEFT } />
            </button>
        );
    }

    renderCloseButton(isVisible = false) {
        const { onCloseButtonClick, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <button
                key="close"
                className={ this.classList("Button", { type: "close", isVisible }) }
                onClick={ onCloseButtonClick }
                aria-label="Close"
                aria-hidden={ !isVisible }
                tabIndex={ isVisible ? 0 : -1 }
            >
                <CloseIcon />
            </button>
        );
    }

    renderTitle(isVisible = false) {
        const { navigationState: { title } } = this.props;

        return (
            <h1
                key="title"
                className={ this.classList("Title", { isVisible }) }
            >
                { title }
            </h1>
        );
    }

    renderLogoImage() {
        const {
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width
        } = this.props;

        /*
         * If no src defined from the backend, pass null in order to display placeholder
         * and prevent unnecessary load of corrupted resource
         */
        const logoSrc = header_logo_src ? media(header_logo_src, LOGO_MEDIA) : null;

        CSS.setVariable(this.logoRef, "header-logo-height", `${logo_height}px`);
        CSS.setVariable(this.logoRef, "header-logo-width", `${logo_width}px`);

        return (
            <Logo
                src={ logoSrc }
                alt={ logo_alt }
                title={ logo_alt }
            />
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <Link
                to="/"
                aria-label="Go to homepage by clicking on website logo"
                aria-hidden={ !isVisible }
                tabIndex={ isVisible ? 0 : -1 }
                className={ this.classList("LogoWrapper", { isVisible }) }
                key="logo"
            >
                { this.renderLogoImage() }
            </Link>
        );
    }

    renderAccountOverlayFallback() {
        return (
            <PopupSuspense
                actualOverlayKey={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
            />
        );
    }

    renderAccountOverlay() {
        const {
            isCheckout,
            showMyAccountLogin,
            onSignIn
        } = this.props;

        // This is here to prevent the popup-suspense from rendering
        if (!showMyAccountLogin) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderAccountOverlayFallback() }>
                <MyAccountOverlay
                    onSignIn={ onSignIn }
                    isCheckout={ isCheckout }
                />
            </Suspense>
        );
    }

    renderAccountButton() {
        const {
            onMyAccountButtonClick,
            device
        } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <button
                className={ this.classList("MyAccountWrapper" ) }
                tabIndex="0"
                onClick={ onMyAccountButtonClick }
                aria-label="Open my account"
                id="myAccount"
            >
                <UserIcon />
            </button>
        );
    }

    renderAccount(isVisible = false) {
        const { onMyAccountOutsideClick } = this.props;


        return (
            <div key="account" block="Header" elem="MyAccountContainer">
                { this.renderWelcomeMessage() }
                <ClickOutside
                    onClick={ onMyAccountOutsideClick }
                >
                    <div
                        aria-label="My account"
                        className={ this.classList("MyAccount") }
                    >
                        { this.renderAccountButton(isVisible) }
                        { this.renderAccountOverlay() }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    renderOkButton(isVisible = false) {
        const { onOkButtonClick } = this.props;

        return (
            <button
                key="ok"
                className={ this.classList("Button", { type: "ok", isVisible }) }
                onClick={ onOkButtonClick }
                aria-label="Save changes"
                aria-hidden={ !isVisible }
                tabIndex={ isVisible ? 0 : -1 }
            >
                { "OK" }
            </button>
        );
    }

    renderWelcomeMessage() {
        const { firstname } = this.props;

        if (!isSignedIn() || !firstname) {
            return null;
        }

        return (
            <div className={ this.classList("Welcome", { type: "Welcome" }) }>
                { ("Welcome, %s!", firstname) }
            </div>
        );
    }

    renderCancelButton(isVisible = false) {
        const { onCancelButtonClick } = this.props;

        return (
            <button
                key="cancel"
                className={ this.classList("Button", { type: "cancel", isVisible }) }
                onClick={ onCancelButtonClick }
                aria-label="Cancel changes"
                aria-hidden={ !isVisible }
                tabIndex={ isVisible ? 0 : -1 }
            >
                { "Cancel" }
            </button>
        );
    }

    render() {
        const {
            navigationState: { name, isHiddenOnMobile = false }
        } = this.props;

        const mixClass = cn("FixedElement");

        return (
            <section className={ this.classList("Wrapper", { isPrerendered: isSSR() || isCrawler() }) }>
                <header
                    className={ this.classList({ name, isHiddenOnMobile }, [mixClass("Top")]) }
                    ref={ this.logoRef }
                >
                    <nav className={ this.classList("Nav") }>
                        { this.renderNavigationState() }
                    </nav>
                </header>
                <OfflineNotice />
            </section>
        );
    }
}

export default Header;
