/* eslint-disable max-lines */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { CUSTOMER_ACCOUNT, CUSTOMER_ACCOUNT_PAGE } from "component/Header/Header.config";
import { updateMeta } from "store/Meta/Meta.action";
import { changeNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { toggleOverlayByKey } from "store/Overlay/Overlay.action";
import { DASHBOARD } from "type/Account";
import { HistoryType, LocationType, MatchType } from "type/Common";
import { isSignedIn } from "util/Auth";
import history from "util/History";
import { replace } from "util/Url";

import MyAccount from "./MyAccount.component";
import { ACCOUNT_LOGIN_URL, MY_ACCOUNT_URL } from "./MyAccount.config";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Route/MyAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Route/MyAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    requestCustomerData: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    ),
    toggleOverlayByKey: (key) => dispatch(toggleOverlayByKey(key)),
    updateMeta: (meta) => dispatch(updateMeta(meta))
});

/** @namespace Route/MyAccount/Container */
export class MyAccountContainer extends PureComponent {
    static propTypes = {
        changeHeaderState: PropTypes.func.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        toggleOverlayByKey: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        match: MatchType.isRequired,
        location: LocationType.isRequired,
        history: HistoryType.isRequired,
        isMobile: PropTypes.bool.isRequired,
        isSignedIn: PropTypes.bool.isRequired
    };

    static tabMap = {
        [DASHBOARD]: {
            url: "/dashboard",
            name: "Dashboard"
        }
    };

    static isTabEnabled(props, tabName) {
        switch (tabName) {
        default:
            return true;
        }
    }

    static navigateToSelectedTab(props, state = {}) {
        const {
            history,
            isSignedIn,
            match: {
                params: {
                    tab: historyActiveTab
                } = {}
            } = {}
        } = props;

        const { activeTab } = state;

        // Redirect to Dashboard, if user visited non-existent or disabled page
        const newActiveTab = this.tabMap[historyActiveTab] && this.isTabEnabled(props, historyActiveTab)
            ? historyActiveTab
            : DASHBOARD;

        if (historyActiveTab !== newActiveTab && isSignedIn) {
            history.push(`${ MY_ACCOUNT_URL }/${ newActiveTab }`);
        }

        if (activeTab !== newActiveTab) {
            return { activeTab: newActiveTab };
        }

        return null;
    }

    containerFunctions = {
        changeActiveTab: this.changeActiveTab.bind(this),
        onSignIn: this.onSignIn.bind(this),
        onSignOut: this.onSignOut.bind(this)
    };

    constructor(props) {
        super(props);

        const {
            updateMeta,
            toggleOverlayByKey
        } = this.props;

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            ...MyAccountContainer.navigateToSelectedTab(this.props),
            isEditingActive: false
        };

        if (!isSignedIn()) {
            toggleOverlayByKey(CUSTOMER_ACCOUNT);
        }

        updateMeta({ title: "My account" });

        this.redirectIfNotSignedIn();
        this.onSignIn();
    }

    static getDerivedStateFromProps(props, state) {
        return MyAccountContainer.navigateToSelectedTab(props, state);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            isSignedIn: prevIsSignedIn
        } = prevProps;

        const {
            isSignedIn: currIsSignedIn
        } = this.props;

        const { activeTab: prevActiveTab } = prevState;
        const { activeTab } = this.state;

        this.redirectIfNotSignedIn();

        if (prevIsSignedIn !== currIsSignedIn) {
            this.changeHeaderState();
        }

        if (prevActiveTab !== activeTab) {
            this.changeHeaderState();
        }

        if (!isSignedIn()) {
            this.changeHeaderState("default");
        }
    }

    containerProps() {
        const { activeTab, isEditingActive } = this.state;

        return {
            activeTab,
            isEditingActive
        };
    }

    isTabEnabled(tabName) {
        switch (tabName) {
        default:
            return true;
        }
    }

    tabsFilterEnabled() {
        return Object.fromEntries(Object.entries(MyAccountContainer.tabMap)
            .filter(([tabName]) => this.isTabEnabled(this.props, tabName)));
    }

    onSignOut() {
        const { toggleOverlayByKey } = this.props;
        this.setState({ activeTab: DASHBOARD });
        toggleOverlayByKey(CUSTOMER_ACCOUNT);
        history.push("/");
    }

    onSignIn() {
        const { requestCustomerData } = this.props;

        if (isSignedIn()) {
            requestCustomerData();
        }

        this.changeHeaderState();
    }

    changeDefaultHeaderState() {
        const { changeHeaderState } = this.props;

        changeHeaderState({
            title: "My account",
            name: CUSTOMER_ACCOUNT_PAGE,
            onBackClick: () => history.push("/")
        });
    }

    changeHeaderState() {
        this.changeDefaultHeaderState();
    }

    changeActiveTab(activeTab) {
        const { history } = this.props;
        const { [activeTab]: { url } } = this.tabsFilterEnabled(MyAccountContainer.tabMap);

        history.push(`${ MY_ACCOUNT_URL }${ url }`);
        this.changeHeaderState(activeTab);
    }

    redirectIfNotSignedIn() {
        const {
            history,
            location: { pathname },
            isMobile
        } = this.props;

        if (isSignedIn()) { // Do nothing for signed-in users
            return;
        }

        if (isMobile) { // Do not redirect on mobile
            return;
        }

        if (pathname === "/forgot-password") { // Forward the forgot password state
            history.push({ pathname: "/", state: { isForgotPassword: true } });

            return;
        }

        // eslint-disable-next-line no-constant-condition
        const path = true ? ACCOUNT_LOGIN_URL : replace(/\/my-account\/.*/, ACCOUNT_LOGIN_URL);

        history.push({ pathname: path });
    }

    render() {
        return (
            <MyAccount
                { ...this.containerProps() }
                { ...this.containerFunctions }
                tabMap={ this.tabsFilterEnabled(MyAccountContainer.tabMap) }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer);
