/* eslint-disable no-restricted-globals */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { updateConfigDevice } from "store/Config/Config.action";
import { updateMeta } from "store/Meta/Meta.action";
import {
    isMobile,
    isMobileClientHints,
    isUsingClientHints
} from "util/Mobile";

import Router from "./Router.component";

export const ConfigDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/Config/Config.dispatcher"
);
export const MyAccountDispatcher = import(
    /* WebpackMode: "lazy", webpackChunkName: "dispatchers" */
    "store/MyAccount/MyAccount.dispatcher"
);

/** @namespace Component/Router/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isLoading: state.ConfigReducer.isLoading,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title,
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    meta_title: state.MetaReducer.title,
    device: state.ConfigReducer.device,
    isOffline: state.OfflineReducer.isOffline,
    isBigOffline: state.OfflineReducer.isBig,
    status_code: state.MetaReducer.status_code
});

/** @namespace Component/Router/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateConfigDevice: (device) => dispatch(updateConfigDevice(device)),
    init: () => {
        // ConfigDispatcher.then(
        //     ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        // );
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleCustomerDataOnInit(dispatch)
        );
    }
});

/** @namespace Component/Router/Container */
export class RouterContainer extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        updateMeta: PropTypes.func.isRequired,
        updateConfigDevice: PropTypes.func.isRequired,
        default_description: PropTypes.string,
        default_keywords: PropTypes.string,
        default_title: PropTypes.string,
        title_prefix: PropTypes.string,
        title_suffix: PropTypes.string,
        isLoading: PropTypes.bool,
        isBigOffline: PropTypes.bool,
        meta_title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                TranslatedValue: PropTypes.string,
                value: PropTypes.string,
                injectables: PropTypes.array
            })
        ]),
        status_code: PropTypes.string
    };

    static defaultProps = {
        default_description: "",
        default_keywords: "",
        default_title: "",
        title_prefix: "",
        title_suffix: "",
        isLoading: true,
        isBigOffline: false,
        meta_title: "",
        status_code: ""
    };

    constructor(props) {
        super(props);

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = ({
            currentUrl: window.location.pathname
        });

        this.initializeApplication();
        this.handleResize();
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentDidUpdate(prevProps) {
        const { isLoading, updateMeta } = this.props;
        const { isLoading: prevIsLoading } = prevProps;

        if (!isLoading && isLoading !== prevIsLoading) {
            const {
                default_description,
                default_keywords,
                default_title,
                title_prefix,
                title_suffix,
                meta_title,
                status_code
            } = this.props;

            const { value: metaTitle = meta_title } = meta_title;

            updateMeta({
                default_title,
                title: metaTitle || default_title,
                default_description,
                description: default_description,
                default_keywords,
                keywords: default_keywords,
                title_prefix,
                title_suffix,
                status_code
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize = async () => {
        const { updateConfigDevice } = this.props;
        if (isUsingClientHints) {
            const { platform, model } = await isMobileClientHints.getDeviceData();
            updateConfigDevice({
                isMobile: isMobile.any(),
                android: isMobile.android(platform),
                ios: isMobile.iOS(platform),
                blackberry: isMobile.blackBerry(model),
                opera: isMobile.opera(model),
                safari: isMobile.safari(model),
                windows: isMobile.windows(model)
            });
        } else {
            updateConfigDevice({
                isMobile: isMobile.any(),
                android: isMobile.android(),
                ios: isMobile.iOS(),
                blackberry: isMobile.blackBerry(),
                opera: isMobile.opera(),
                safari: isMobile.safari(),
                windows: isMobile.windows()
            });
        }
    };

    containerProps() {
        const { isBigOffline } = this.props;

        return { isBigOffline };
    }

    initializeApplication() {
        const { init } = this.props;
        init();
    }

    render() {
        return (
            <Router
                { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
