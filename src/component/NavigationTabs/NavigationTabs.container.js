/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { connect } from "react-redux";

import { MY_ACCOUNT } from "component/Header/Header.config";
import { NavigationAbstractContainer } from "component/NavigationAbstract/NavigationAbstract.container";

import { ACCOUNT_LOGIN_URL } from "route/MyAccount/MyAccount.config";
import { changeNavigationState, goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { hideActiveOverlay, toggleOverlayByKey } from "store/Overlay/Overlay.action";
import { isSignedIn } from "util/Auth";
import browserHistory from "util/History";
import { debounce } from "util/Request";

import NavigationTabs from "./NavigationTabs.component";
import {
    ACCOUNT_TAB,
    HOME_TAB
} from "./NavigationTabs.config";

/** @namespace Component/NavigationTabs/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    navigationState: state.NavigationReducer[BOTTOM_NAVIGATION_TYPE].navigationState,
    headerState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
    device: state.ConfigReducer.device
});

/** @namespace Component/NavigationTabs/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(BOTTOM_NAVIGATION_TYPE))
});

export const DEFAULT_NAVIGATION_TABS_STATE = { name: HOME_TAB };

/** @namespace Component/NavigationTabsContainer/Container */
export class NavigationTabsContainer extends NavigationAbstractContainer {
    default_state = DEFAULT_NAVIGATION_TABS_STATE;

    scrollPosition = 0;

    routeMap = {
        "/account": { name: ACCOUNT_TAB },
        "/my-account": { name: ACCOUNT_TAB },
        "/": { name: HOME_TAB },
        "": { name: HOME_TAB }
    };

    containerFunctions = {
        onMyAccountButtonClick: this.onMyAccountButtonClick.bind(this),
        onHomeButtonClick: this.onHomeButtonClick.bind(this)
    };

    componentDidMount() {
        this.handleNavVisibility();

        const SCROLL_DEBOUNCE_DELAY = 10;
        // Const { name } = this.getNavigationState();
        window.addEventListener("scroll", debounce(this.handleScroll, SCROLL_DEBOUNCE_DELAY));

        super.componentDidMount();
    }

    componentDidUpdate(prevProps) {
        this.handleNavVisibility();
        this.handleVisibleOnScrollChange(prevProps);
    }

    containerProps() {
        const { device, navigationState } = this.props;

        return { device, navigationState };
    }

    handleNavVisibility() {
        const { navigationState: { isHidden } } = this.props;

        if (isHidden) {
            document.documentElement.classList.add("hiddenNavigationTabs");

            return;
        }

        document.documentElement.classList.remove("hiddenNavigationTabs");
    }

    handleVisibleOnScrollChange(prevProps) {
        const { navigationState: { isVisibleOnScroll } } = this.props;
        const { navigationState: { isVisibleOnScroll: prevIsVisible } } = prevProps;

        if (isVisibleOnScroll !== prevIsVisible) {
            this.scrollPosition = window.pageYOffset;
            document.documentElement.classList.remove("hideOnScroll");
        }
    }

    handleNavVisibilityOnScroll(windowY) {
        const ERROR_TOP_OFFSET = 10;
        const ERROR_BOTTOM_OFFSET = 20;
        const TOP_MIN_OFFSET = 100;

        const doc = document.body;
        const offset = window.innerHeight + window.pageYOffset;
        const height = doc.scrollHeight;

        if (windowY < TOP_MIN_OFFSET) {
            // We are on top
            document.documentElement.classList.remove("hideOnScroll");

            return;
        }

        if (offset >= (height - ERROR_BOTTOM_OFFSET)) {
            // We are on the bottom
            document.documentElement.classList.remove("hideOnScroll");

            return;
        }

        // Scroll is less then min offset
        if (Math.abs(windowY - this.scrollPosition) < ERROR_TOP_OFFSET) {
            return;
        }

        if (windowY < this.scrollPosition) {
            // Scrolling UP
            document.documentElement.classList.remove("hideOnScroll");
        } else {
            // Scrolling DOWN
            document.documentElement.classList.add("hideOnScroll");
        }
    }

    handleScroll = () => {
        const { navigationState: { isVisibleOnScroll } } = this.props;
        if (!isVisibleOnScroll) {
            return;
        }

        const windowY = window.pageYOffset;
        this.handleNavVisibilityOnScroll(windowY);
        this.scrollPosition = windowY;
    };

    handleMobileRouteChange(history) {
        const {
            setNavigationState,
            navigationState: { name }
        } = this.props;

        const { pathname } = history;

        // Find the new state name
        const newNavigationState = this.getNavigationState();
        const { name: newName } = newNavigationState;

        // Update the state if new name is set
        if (name !== newName) {
            setNavigationState(newNavigationState);
        }

        this.preserveState(name, newName);

        return { prevPathname: pathname };
    }

    onMyAccountButtonClick() {
        const { pathname } = location;
        const url = isSignedIn() ? `/${ MY_ACCOUNT }` : ACCOUNT_LOGIN_URL;

        if (pathname !== url) {
            browserHistory.push(url);
        }
    }

    onHomeButtonClick() {
        const {
            hideActiveOverlay
        } = this.props;

        const { pathname } = location;

        browserHistory.push("/");
        hideActiveOverlay();

        if (pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    render() {
        return (
            <NavigationTabs
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTabsContainer);
