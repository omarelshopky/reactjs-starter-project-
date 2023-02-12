/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from "component/MyAccountOverlay/MyAccountOverlay.config";
import { DEFAULT_STATE_NAME } from "component/NavigationAbstract/NavigationAbstract.config";
import { NavigationAbstractContainer } from "component/NavigationAbstract/NavigationAbstract.container";
import { CUSTOMER } from "store/MyAccount/MyAccount.dispatcher";
import { changeNavigationState, goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { hideActiveOverlay, toggleOverlayByKey } from "store/Overlay/Overlay.action";
import { DeviceType } from "type/Device";
import { isSignedIn } from "util/Auth";
import BrowserDatabase from "util/BrowserDatabase/BrowserDatabase";
import history from "util/History";

import Header from "./Header.component";
import {
    CMS_PAGE, CUSTOMER_ACCOUNT,
    CUSTOMER_ACCOUNT_PAGE, CUSTOMER_SUB_ACCOUNT
} from "./Header.config";

/** @namespace Component/Header/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    header_logo_src: state.ConfigReducer.header_logo_src,
    isOffline: state.OfflineReducer.isOffline,
    logo_alt: state.ConfigReducer.logo_alt,
    logo_height: state.ConfigReducer.logo_height,
    logo_width: state.ConfigReducer.logo_width,
    isLoading: state.ConfigReducer.isLoading,
    device: state.ConfigReducer.device,
    activeOverlay: state.OverlayReducer.activeOverlay
});

/** @namespace Component/Header/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

export const DEFAULT_HEADER_STATE = {
    name: DEFAULT_STATE_NAME,
    isHiddenOnMobile: false
};

/** @namespace Component/Header/Container */
export class HeaderContainer extends NavigationAbstractContainer {
    static propTypes = {
        showOverlay: PropTypes.func.isRequired,
        showPopup: PropTypes.func,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        header_logo_src: PropTypes.string,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        header_logo_src: ""
    };

    default_state = DEFAULT_HEADER_STATE;

    routeMap = {
        // eslint-disable-next-line max-len
        "/account/confirm": { name: CMS_PAGE, title: "Confirm account", onBackClick: () => history.push("/") },
        "/my-account": { name: CUSTOMER_ACCOUNT_PAGE, onBackClick: () => history.push("/") },
        "/": { name: DEFAULT_STATE_NAME, isHiddenOnMobile: true }
    };

    containerFunctions = {
        onBackButtonClick: this.onBackButtonClick.bind(this),
        onCloseButtonClick: this.onCloseButtonClick.bind(this),
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onEditButtonClick: this.onEditButtonClick.bind(this),
        onOkButtonClick: this.onOkButtonClick.bind(this),
        onCancelButtonClick: this.onCancelButtonClick.bind(this),
        onMyAccountOutsideClick: this.onMyAccountOutsideClick.bind(this)
    };

    containerProps() {
        const {
            activeOverlay,
            navigationState,
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width,
            isLoading,
            device
        } = this.props;

        const {
            isClearEnabled,
            showMyAccountLogin
        } = this.state;

        return {
            activeOverlay,
            navigationState,
            header_logo_src,
            logo_alt,
            logo_height,
            logo_width,
            isLoading,
            isClearEnabled,
            showMyAccountLogin,
            device,
            firstname: this.getUserName()
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            prevPathname: "",
            searchCriteria: "",
            isClearEnabled: this.getIsClearEnabled(),
            showMyAccountLogin: false
        };
    }

    componentDidMount() {
        this.handleHeaderVisibility();
        super.componentDidMount();
    }

    componentDidUpdate() {
        this.handleHeaderVisibility();
    }

    // eslint-disable-next-line complexity
    getNavigationState() {
        const { navigationState } = this.props;

        const { pathname } = location;
        const { state: historyState } = window.history || {};
        const { state = {} } = historyState || {};

        const activeRoute = Object.keys(this.routeMap)
            .find((route) => (
                route !== "/"
                || pathname === "/"
            ) && pathname.includes(route));

        if (state.category || state.product || state.page || state.popupOpen) { // Keep state if it category is in state
            return navigationState;
        }

        return this.routeMap[activeRoute] || this.default_state;
    }

    getUserName() {
        const { firstname } = BrowserDatabase.getItem(CUSTOMER) || {};

        return firstname;
    }

    handleHeaderVisibility() {
        const { navigationState: { isHiddenOnMobile } } = this.props;

        if (isHiddenOnMobile) {
            document.documentElement.classList.add("hiddenHeader");

            return;
        }

        document.documentElement.classList.remove("hiddenHeader");
    }

    handleMobileUrlChange(history) {
        const { prevPathname } = this.state;
        const { pathname } = history;
        const isClearEnabled = this.getIsClearEnabled();

        if (prevPathname === pathname) {
            return { isClearEnabled };
        }

        return {
            isClearEnabled,
            showMyAccountLogin: false
        };
    }

    getIsClearEnabled() {
        const { location: { search } } = history;

        return new RegExp([
            "customFilters",
            "priceMax",
            "priceMin"
        ].join("|")).test(search);
    }

    onBackButtonClick(e) {
        const { navigationState: { onBackClick } } = this.props;

        this.setState({ searchCriteria: "" });

        if (onBackClick) {
            onBackClick(e);
        }
    }

    onCloseButtonClick(e) {
        const { hideActiveOverlay, goToPreviousNavigationState } = this.props;
        const { navigationState: { onCloseClick } } = this.props;

        this.setState({ searchCriteria: "" });

        if (onCloseClick) {
            onCloseClick(e);
        }

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: "/my-account/dashboard" });

            return;
        }

        this.setState({ showMyAccountLogin: true }, () => {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({
                name: "checkout",
                title: "Sign in",
                onCloseClick: this.closeOverlay
            });
        });
    }

    onMyAccountOutsideClick() {
        const {
            goToPreviousNavigationState,
            hideActiveOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (device.isMobile || ![CUSTOMER_ACCOUNT, CUSTOMER_SUB_ACCOUNT].includes(name)) {
            return;
        }

        if (name === CUSTOMER_SUB_ACCOUNT) {
            goToPreviousNavigationState();
        }

        this.goToDefaultHeaderState();
        hideActiveOverlay();
    }

    onEditButtonClick(e) {
        const { navigationState: { onEditClick } } = this.props;

        if (onEditClick) {
            onEditClick(e);
        }
    }

    onOkButtonClick(e) {
        const {
            navigationState: { onOkClick, shouldNotGoToPrevState = false },
            goToPreviousNavigationState
        } = this.props;

        if (onOkClick) {
            onOkClick(e);
        }

        if (!shouldNotGoToPrevState) {
            goToPreviousNavigationState();
        }
    }

    onCancelButtonClick() {
        const {
            navigationState: { onCancelClick },
            goToPreviousNavigationState
        } = this.props;

        if (onCancelClick) {
            onCancelClick();
        }

        goToPreviousNavigationState();
    }

    render() {
        return (
            <Header
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
