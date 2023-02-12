/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setBigOfflineNotice, showOfflineNotice } from "store/Offline/Offline.action";
import { LocationType } from "type/Common";

import OfflineNotice from "./OfflineNotice.component";

/** @namespace Component/OfflineNotice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOffline: state.OfflineReducer.isOffline,
    isBig: state.OfflineReducer.isBig
});

/** @namespace Component/OfflineNotice/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOfflineNotice: (isOffline) => dispatch(showOfflineNotice(isOffline)),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig))
});

/** @namespace Component/OfflineNotice/Container */
export class OfflineNoticeContainer extends PureComponent {
    static propTypes = {
        setBigOfflineNotice: PropTypes.func.isRequired,
        showOfflineNotice: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        isBig: PropTypes.bool.isRequired,
        isPage: PropTypes.bool
    };

    static defaultProps = {
        isPage: false
    };

    componentDidMount() {
        const { isPage } = this.props;

        if (!isPage) {
            this.handleNetworkChange();
            window.addEventListener("online", this.handleNetworkChange);
            window.addEventListener("offline", this.handleNetworkChange);
        }
    }

    componentDidUpdate(prevProps) {
        const {
            location: { pathname },
            isBig,
            setBigOfflineNotice
        } = this.props;

        const {
            isBig: prevIsBig,
            location: { pathname: prevPathname }
        } = prevProps;

        if (isBig !== prevIsBig && !navigator.onLine) {
            if (isBig) {
                document.documentElement.classList.add("bigOffline");
            } else {
                document.documentElement.classList.remove("bigOffline");
            }
        }

        if (pathname !== prevPathname) {
            if (isBig) {
                setBigOfflineNotice(false);
            }
        }
    }

    componentWillUnmount() {
        const { isPage } = this.props;

        if (!isPage) {
            window.removeEventListener("online", this.handleNetworkChange);
            window.removeEventListener("offline", this.handleNetworkChange);
        }
    }

    containerProps() {
        const {
            isBig,
            isPage,
            location,
            setBigOfflineNotice,
            showOfflineNotice
        } = this.props;

        return {
            isBig,
            isPage,
            location,
            setBigOfflineNotice,
            showOfflineNotice
        };
    }

    handleNetworkChange = () => {
        const {
            isBig,
            showOfflineNotice,
            setBigOfflineNotice
        } = this.props;

        if (navigator.onLine) {
            document.documentElement.classList.remove("offline");
            showOfflineNotice(false);
        } else {
            document.documentElement.classList.add("offline");
            showOfflineNotice(true);
            if (isBig) {
                setBigOfflineNotice(false);
            }
        }
    };

    render() {
        return (
            <OfflineNotice
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OfflineNoticeContainer)
);
