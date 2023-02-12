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

import { CUSTOMER_ACCOUNT, CUSTOMER_SUB_ACCOUNT } from "component/Header/Header.config";
import {
    ACCOUNT_LOGIN_URL,
    ACCOUNT_URL,
    MY_ACCOUNT_URL
} from "route/MyAccount/MyAccount.config";
import { changeNavigationState, goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { showNotification } from "store/Notification/Notification.action";
import { hideActiveOverlay, toggleOverlayByKey } from "store/Overlay/Overlay.action";
import { isSignedIn } from "util/Auth";
import history from "util/History";

import MyAccountOverlay from "./MyAccountOverlay.component";
import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from "./MyAccountOverlay.config";

/** @namespace Component/MyAccountOverlay/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    isMobile: state.ConfigReducer.device.isMobile,
    isPasswordForgotSend: state.MyAccountReducer.isPasswordForgotSend,
    isOverlayVisible: state.OverlayReducer.activeOverlay === CUSTOMER_ACCOUNT,
    isLoading: state.MyAccountReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/MyAccountOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    setHeaderState: (headerState) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, headerState)),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

/** @namespace Component/MyAccountOverlay/Container */
export class MyAccountOverlayContainer extends PureComponent {
    static propTypes = {
        isPasswordForgotSend: PropTypes.bool.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        showNotification: PropTypes.func.isRequired,
        isOverlayVisible: PropTypes.bool.isRequired,
        showOverlay: PropTypes.func.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        onSignIn: PropTypes.func,
        goToPreviousHeaderState: PropTypes.func,
        isCheckout: PropTypes.bool,
        hideActiveOverlay: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isCheckout: false,
        isLoading: false,
        onSignIn: () => {},
        goToPreviousHeaderState: () => {}
    };

    containerFunctions = {
        onFormError: this.onFormError.bind(this),
        handleForgotPassword: this.handleForgotPassword.bind(this),
        handleSignIn: this.handleSignIn.bind(this),
        handleCreateAccount: this.handleCreateAccount.bind(this),
        onVisible: this.onVisible.bind(this),
        setSignInState: this.setSignInState.bind(this),
        setLoadingState: this.setLoadingState.bind(this)
    };

    constructor(props) {
        super(props);

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = this.redirectOrGetState(props);
    }

    // eslint-disable-next-line complexity
    static getDerivedStateFromProps(props, state) {
        const {
            isPasswordForgotSend,
            showNotification,
            isOverlayVisible,
            isMobile
        } = props;

        const {
            isPasswordForgotSend: currentIsPasswordForgotSend,
            state: myAccountState
        } = state;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const stateToBeUpdated = {};
        const userIsSignedIn = isSignedIn();

        if (!isMobile) {
            if (!isOverlayVisible && !userIsSignedIn) {
                if (pathname !== "/forgot-password" && !isForgotPassword) {
                    stateToBeUpdated.state = STATE_SIGN_IN;
                }
            } else if (!isOverlayVisible && userIsSignedIn) {
                stateToBeUpdated.state = STATE_LOGGED_IN;
            }
        }

        if (myAccountState !== STATE_LOGGED_IN && userIsSignedIn) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.state = STATE_LOGGED_IN;
        }

        if (myAccountState === STATE_LOGGED_IN && !userIsSignedIn) {
            stateToBeUpdated.state = STATE_SIGN_IN;
        }

        if (isPasswordForgotSend !== currentIsPasswordForgotSend) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.isPasswordForgotSend = isPasswordForgotSend;
            // eslint-disable-next-line max-len
            showNotification("success", "If there is an account associated with the provided address you will receive an email with a link to reset your password.");
            stateToBeUpdated.state = STATE_SIGN_IN;
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    // eslint-disable-next-line complexity
    componentDidUpdate(prevProps, prevState) {
        const { isSignedIn: prevIsSignedIn } = prevProps;
        const { state: oldMyAccountState } = prevState;
        const { state: newMyAccountState } = this.state;
        const { location: { pathname } } = history;

        const {
            isSignedIn,
            hideActiveOverlay,
            isCheckout,
            goToPreviousHeaderState
        } = this.props;

        if (oldMyAccountState === newMyAccountState) {
            return;
        }

        if (isSignedIn !== prevIsSignedIn) {
            hideActiveOverlay();

            if (isCheckout) {
                goToPreviousHeaderState();
            }
        }

        if (newMyAccountState !== STATE_LOGGED_IN && pathname.includes(MY_ACCOUNT_URL)) {
            history.push({ pathname: ACCOUNT_LOGIN_URL });
        }

        if (newMyAccountState === STATE_LOGGED_IN) {
            if (pathname.includes(ACCOUNT_URL)) {
                history.push({ pathname: "/" });
            }
        }
    }

    containerProps() {
        const {
            isOverlayVisible,
            isMobile,
            isLoading: propIsLoading,
            onSignIn
        } = this.props;
        const {
            isLoading: stateIsLoading,
            state,
            isCheckout
        } = this.state;

        return {
            isCheckout,
            isLoading: propIsLoading || stateIsLoading,
            isMobile,
            isOverlayVisible,
            onSignIn,
            state
        };
    }

    setSignInState(state) {
        this.setState({ state });
    }

    setLoadingState(isLoading) {
        this.setState({ isLoading });
    }

    redirectOrGetState = (props) => {
        const {
            showOverlay,
            setHeaderState,
            isPasswordForgotSend,
            isMobile
        } = props;

        const { location: { pathname, state: { isForgotPassword } = {} } } = history;

        const state = {
            state: isSignedIn() ? STATE_LOGGED_IN : STATE_SIGN_IN,
            // eslint-disable-next-line react/no-unused-state
            isPasswordForgotSend,
            isLoading: false
        };

        // If customer got here from forgot-password
        if (pathname !== "/forgot-password" && !isForgotPassword) {
            return state;
        }

        state.state = STATE_FORGOT_PASSWORD;

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: "Forgot password",
            onBackClick: (e) => {
                history.push({ pathname: "/my-account" });
                this.handleSignIn(e);
            }
        });

        if (isMobile) {
            history.push({ pathname: "/my-account", state: { isForgotPassword: true } });

            return state;
        }

        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);

        return state;
    };

    onVisible() {
        const { setHeaderState, isCheckout, isMobile } = this.props;

        if (isMobile && !isCheckout) {
            setHeaderState({ name: CUSTOMER_ACCOUNT, title: "Sign in" });
        }
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    stopLoading = () => this.setState({ isLoading: false });

    stopLoadingAndHideOverlay = () => {
        const { hideActiveOverlay } = this.props;
        this.stopLoading();
        hideActiveOverlay();
    };

    handleForgotPassword(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_FORGOT_PASSWORD });

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: "Forgot password",
            onBackClick: () => this.handleSignIn(e)
        });
    }

    handleSignIn(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_SIGN_IN });

        setHeaderState({
            name: CUSTOMER_ACCOUNT,
            title: "Sign in"
        });
    }

    handleCreateAccount(e) {
        const { setHeaderState } = this.props;
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({ state: STATE_CREATE_ACCOUNT });

        setHeaderState({
            name: CUSTOMER_SUB_ACCOUNT,
            title: "Create account",
            onBackClick: () => this.handleSignIn(e)
        });
    }

    render() {
        return (
            <MyAccountOverlay
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOverlayContainer);
