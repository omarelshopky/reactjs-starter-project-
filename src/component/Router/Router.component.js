/* eslint-disable max-lines */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */

/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import {
    cloneElement,
    lazy,
    PureComponent,
    Suspense
} from "react";
import { Route, Switch, Router as ReactRouter } from "react-router-dom";

import Loader from "component/Loader";
import Meta from "component/Meta";
import history from "util/History";

import {
    ACCOUNT_FORGOT_PASSWORD,
    AFTER_ITEMS_TYPE,
    BEFORE_ITEMS_TYPE,
    CHANGE_PASSWORD,
    CONFIRM_ACCOUNT,
    COOKIE_POPUP,
    CREATE_ACCOUNT,
    DEMO_NOTICE,
    FOOTER,
    FORGOT_PASSWORD,
    HEADER,
    HOME,
    LOGIN,
    MY_ACCOUNT,
    NAVIGATION_TABS,
    NEW_VERSION_POPUP,
    NOTIFICATION_LIST,
    STYLE_GUIDE,
    SWITCH_ITEMS_TYPE,
    NO_MATCH
} from "./Router.config";

export const CookiePopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ "component/CookiePopup"));
export const DemoNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ "component/DemoNotice"));
export const Header = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ "component/Header"));
export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ "route/HomePage"));
export const MyAccount = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "account" */ "route/MyAccount"));
export const PasswordChangePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ "route/PasswordChangePage"));
export const ConfirmAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ "route/ConfirmAccountPage"));
export const Footer = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "footer" */ "component/Footer"));
export const NavigationTabs = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "header" */ "component/NavigationTabs"));
export const NewVersionPopup = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ "component/NewVersionPopup"));
export const NotificationList = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ "component/NotificationList"));
export const OfflineNotice = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "notice" */ "component/OfflineNotice"));
export const CreateAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ "route/CreateAccount"));
export const LoginAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ "route/LoginAccount"));
export const ForgotPasswordPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ "route/ForgotPassword"));
export const SomethingWentWrong = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "something-went-wrong" */ "route/SomethingWentWrong"));
export const StyleGuidePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ "route/StyleGuidePage"));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "compare" */ "route/NoMatch"));


/** @namespace Component/Router/Component/withStoreRegex */
export const withStoreRegex = (path) => window.storeRegexText.concat(path);

/** @namespace Component/Router/Component */
export class Router extends PureComponent {
    static propTypes = {
        isBigOffline: PropTypes.bool
    };

    static defaultProps = {
        isBigOffline: false
    };

    [BEFORE_ITEMS_TYPE] = [
        {
            component: <NotificationList />,
            position: 10,
            name: NOTIFICATION_LIST
        },
        {
            component: <DemoNotice />,
            position: 15,
            name: DEMO_NOTICE
        },
        {
            component: <Header />,
            position: 20,
            name: HEADER
        },
        {
            component: <NavigationTabs />,
            position: 25,
            name: NAVIGATION_TABS
        },
        {
            component: <NewVersionPopup />,
            position: 35,
            name: NEW_VERSION_POPUP
        }
    ];

    [SWITCH_ITEMS_TYPE] = [
        {
            component: <Route path={ withStoreRegex("/") } exact render={ (props) => <HomePage { ...props } /> } />,
            position: 10,
            name: HOME
        },
        {
            component: <Route path={ withStoreRegex("/:account/createPassword/") } render={ (props) => <PasswordChangePage { ...props } /> } />,
            position: 60,
            name: CHANGE_PASSWORD
        },
        {
            component: <Route path={ withStoreRegex("/:account/create/") } render={ (props) => <CreateAccountPage { ...props } /> } />,
            position: 61,
            name: CREATE_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex("/:account/login/") } render={ (props) => <LoginAccountPage { ...props } /> } />,
            position: 62,
            name: LOGIN
        },
        {
            component: <Route path={ withStoreRegex("/:account/forgotpassword/") } render={ (props) => <ForgotPasswordPage { ...props } /> } />,
            position: 63,
            name: ACCOUNT_FORGOT_PASSWORD
        },
        {
            component: <Route path={ withStoreRegex("/:account/confirm") } render={ (props) => <ConfirmAccountPage { ...props } /> } />,
            position: 65,
            name: CONFIRM_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex("/my-account/:tab?") } render={ (props) => <MyAccount { ...props } /> } />,
            position: 70,
            name: MY_ACCOUNT
        },
        {
            component: <Route path={ withStoreRegex("/forgot-password") } render={ (props) => <MyAccount { ...props } /> } />,
            position: 71,
            name: FORGOT_PASSWORD
        },
        {
            component: <Route path={ withStoreRegex("/styleguide") } render={ (props) => <StyleGuidePage { ...props } /> } />,
            position: 84,
            name: STYLE_GUIDE
        },
        {
            component: <Route render={ (props) => <NoMatch { ...props } /> } />,
            position: 1000,
            name: NO_MATCH
        }
    ];

    [AFTER_ITEMS_TYPE] = [
        {
            component: <Footer />,
            position: 10,
            name: FOOTER
        },
        {
            component: <CookiePopup />,
            position: 20,
            name: COOKIE_POPUP
        }
    ];

    state = {
        hasError: false,
        errorDetails: {}
    };

    componentDidCatch(err, info) {
        this.setState({
            hasError: true,
            errorDetails: { err, info }
        });
    }

    getSortedItems(type) {
        return this[type].sort(
            (a, b) => a.position - b.position
        ).filter(
            (entry) => {
                if (!entry.component) {
                    // eslint-disable-next-line no-console
                    console.warn("There is an item without a component property declared in main router.");

                    return false;
                }

                return true;
            }
        );
    }

    handleErrorReset = () => {
        this.setState({ hasError: false });
    };

    renderComponentsOfType(type) {
        return this.getSortedItems(type)
            .map(({ position, component }) => cloneElement(component, { key: position }));
    }

    renderSectionOfType(type) {
        return (
            <Suspense fallback={ <Loader isLoading /> }>
                { this.renderComponentsOfType(type) }
            </Suspense>
        );
    }

    renderMainItems() {
        const { isBigOffline } = this.props;

        if (!navigator.onLine && isBigOffline) {
            return <OfflineNotice isPage />;
        }

        return (
            <Switch>
                { this.renderComponentsOfType(SWITCH_ITEMS_TYPE) }
            </Switch>
        );
    }

    renderErrorRouterContent() {
        const { errorDetails } = this.state;

        return (
            <SomethingWentWrong
                onClick={ this.handleErrorReset }
                errorDetails={ errorDetails }
            />
        );
    }

    renderFallbackPage() {
        return (
            <main style={ { height: "100vh" } }>
                <Loader isLoading />
            </main>
        );
    }

    renderDefaultRouterContent() {
        // eslint-disable-next-line no-restricted-globals
        if (location.pathname.match("/styleguide")) {
            return this.renderMainItems();
        }

        return (
            <>
                { this.renderSectionOfType(BEFORE_ITEMS_TYPE) }
                { this.renderMainItems() }
                { this.renderSectionOfType(AFTER_ITEMS_TYPE) }
            </>
        );
    }

    renderRouterContent() {
        const { hasError } = this.state;

        if (hasError) {
            return this.renderErrorRouterContent();
        }

        return this.renderDefaultRouterContent();
    }

    render() {
        return (
            <>
                <Meta />
                <Suspense fallback={ this.renderFallbackPage() }>
                    <ReactRouter history={ history }>
                        { this.renderRouterContent() }
                    </ReactRouter>
                </Suspense>
            </>
        );
    }
}

export default Router;
