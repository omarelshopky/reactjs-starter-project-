/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { STATE_CONFIRM_EMAIL } from "component/MyAccountOverlay/MyAccountOverlay.config";
import { showNotification } from "store/Notification/Notification.action";
import { signInStateType } from "type/Account";

import MyAccountCreateAccount from "./MyAccountCreateAccount.component";

export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Component/MyAccountCreateAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isLoading: state.MyAccountReducer.isLoading,
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountCreateAccount/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    createAccount: (options) => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.createAccount(options, dispatch)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/MyAccountCreateAccount/Container */
export class MyAccountCreateAccountContainer extends PureComponent {
    static propTypes = {
        createAccount: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLandingPage: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        state: signInStateType.isRequired
    };

    static defaultProps = {
        isLandingPage: false
    };

    containerFunctions = {
        onCreateAccountSuccess: this.onCreateAccountSuccess.bind(this),
        onCreateAccountAttempt: this.onCreateAccountAttempt.bind(this),
        onSubscriptionChange: this.onSubscriptionChange.bind(this)
    };

    state = {
        isSubscriptionSelected: false,
        isSubmitted: false
    };

    containerProps() {
        const {
            state,
            handleSignIn
        } = this.props;

        const { isSubscriptionSelected, isSubmitted } = this.state;

        return {
            state,
            handleSignIn,
            isSubscriptionSelected,
            isSubmitted
        };
    }

    onSubscriptionChange() {
        this.setState((state) => ({ isSubscriptionSelected: !state.isSubscriptionSelected }));
    }

    onCreateAccountAttempt(_, invalidFields) {
        const { showNotification, setLoadingState } = this.props;

        if (invalidFields) {
            showNotification("info", "Incorrect data! Please resolve all field validation errors.");
        }

        setLoadingState(!invalidFields);
        this.setState({ isSubmitted: true });
    }

    async onCreateAccountSuccess(fields) {
        const {
            createAccount,
            onSignIn,
            setSignInState,
            setLoadingState,
            isLoading,
            isLandingPage,
            showNotification,
            isMobile
        } = this.props;

        const {
            password,
            email,
            firstname,
            lastname,
            is_subscribed,
            taxvat
        } = fields;

        const customerData = {
            customer: {
                firstname,
                lastname,
                email,
                is_subscribed,
                taxvat
            },
            password
        };

        if (isLoading) {
            return;
        }

        try {
            const code = await createAccount(customerData);

            // If user needs confirmation
            if (code === 2) {
                setSignInState(STATE_CONFIRM_EMAIL);

                if (isLandingPage || isMobile) {
                    showNotification(
                        "success",
                        // eslint-disable-next-line max-len
                        "The email confirmation link has been sent to your email. Please confirm your account to proceed."
                    );
                }
            } else {
                onSignIn();
            }
        } finally {
            setLoadingState(false);
        }
    }

    render() {
        return (
            <MyAccountCreateAccount
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountCreateAccountContainer);
