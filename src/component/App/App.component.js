/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { PureComponent } from "react";
import { Provider } from "react-redux";
import { Provider as UnstatedProvider } from "unstated";

import Router from "component/Router";
import SharedTransition from "component/SharedTransition";
import SomethingWentWrong from "route/SomethingWentWrong";
import injectStaticReducers from "store";
import getStore from "util/Store";

/** @namespace Component/App/Component */
export class App extends PureComponent {
    productionFunctions = [
        this.disableReactDevTools.bind(this),
        this.injectComment.bind(this)
    ];

    developmentFunctions = [
        this.enableHotReload.bind(this)
    ];

    commonFunctions = [
        this.configureStore.bind(this)
    ];

    rootComponents = [
        this.renderRouter.bind(this),
        this.renderSharedTransition.bind(this)
    ];

    contextProviders = [
        this.renderRedux.bind(this),
        this.renderUnStated.bind(this)
    ];

    state = {
        isSomethingWentWrong: false,
        errorDetails: {}
    };

    constructor(props) {
        super(props);

        this.configureAppBasedOnEnvironment();
        this.configureApp();
    }

    componentDidCatch(err, info) {
        this.setState({
            isSomethingWentWrong: true,
            errorDetails: { err, info }
        });
    }

    configureStore() {
        const store = getStore();
        injectStaticReducers(store);

        this.reduxStore = store;
    }

    renderRedux(children) {
        return (
            <Provider store={ this.reduxStore } key="redux">
                { children }
            </Provider>
        );
    }

    renderUnStated(children) {
        return (
            <UnstatedProvider key="unstated">
                { children }
            </UnstatedProvider>
        );
    }

    enableHotReload() {
        // eslint-disable-next-line no-undef
        if (module.hot) {
            // eslint-disable-next-line no-undef
            module.hot.accept();
        }
    }

    injectComment() {
        const comment = document.createComment("Powered by ScandiPWA (scandipwa.com)");
        document.querySelector("html").appendChild(comment);
    }

    /**
     * Disable react-dev-tools
     * @link https://github.com/facebook/react-devtools/issues/191#issuecomment-367905536
     */
    disableReactDevTools() {
        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
            // eslint-disable-next-line fp/no-loops
            for (const [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
                // eslint-disable-next-line no-empty-function
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value === "function" ? () => {} : null;
            }
        }
    }

    configureAppBasedOnEnvironment() {
        // eslint-disable-next-line no-undef
        const functionsToRun = process.env.NODE_ENV === "production"
            ? this.productionFunctions
            : this.developmentFunctions;

        functionsToRun.forEach((func) => func());
    }

    configureApp() {
        this.commonFunctions.forEach((func) => func());
    }

    handleErrorReset = () => {
        this.setState({ isSomethingWentWrong: false });
    };

    renderSharedTransition() {
        return (
            <SharedTransition key="transition" />
        );
    }

    renderRouter() {
        return (
            <Router key="router" />
        );
    }

    renderRootComponents = () => this.rootComponents.map((render) => render());

    renderContextProviders() {
        const { isSomethingWentWrong } = this.state;

        const child = isSomethingWentWrong
            ? this.renderSomethingWentWrong
            : this.renderRootComponents;

        return this.contextProviders.reduce(
            (acc, render) => render(acc),
            [child()]
        );
    }

    renderSomethingWentWrong = () => {
        const { errorDetails } = this.state;

        return (
            <SomethingWentWrong
                onClick={ this.handleErrorReset }
                errorDetails={ errorDetails }
            />
        );
    };

    render() {
        return this.renderContextProviders();
    }
}

export default App;
