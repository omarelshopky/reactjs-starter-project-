/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */


import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";

import { POPUP } from "component/Header/Header.config";
import { changeNavigationState, goToPreviousNavigationState } from "store/Navigation/Navigation.action";
import { TOP_NAVIGATION_TYPE } from "store/Navigation/Navigation.reducer";
import { hideActiveOverlay, hideActivePopup } from "store/Overlay/Overlay.action";
import { ChildrenType, MixType } from "type/Common";

import Popup from "./Popup.component";

/** @namespace Component/Popup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    activeOverlay: state.OverlayReducer.activeOverlay,
    areOtherOverlaysOpen: state.OverlayReducer.areOtherOverlaysOpen,
    shouldPopupClose: state.PopupReducer.shouldPopupClose,
    payload: state.PopupReducer.popupPayload,
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/Popup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    resetHideActivePopup: () => dispatch(hideActivePopup(false)),
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    goToPreviousNavigationState: (state) => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Component/Popup/Container */
export class PopupContainer extends PureComponent {
    static propTypes = {
        mix: MixType,
        contentMix: MixType,
        payload: PropTypes.objectOf(
            PropTypes.shape({
                title: PropTypes.string
            })
        ).isRequired,
        activeOverlay: PropTypes.string.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        areOtherOverlaysOpen: PropTypes.bool.isRequired,
        changeHeaderState: PropTypes.func.isRequired,
        onVisible: PropTypes.func,
        onClose: PropTypes.func,
        isStatic: PropTypes.bool,
        children: ChildrenType,
        id: PropTypes.string.isRequired,
        shouldPopupClose: PropTypes.bool.isRequired,
        isMobile: PropTypes.bool.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    static defaultProps = {
        onVisible: () => {},
        onClose: () => {},
        mix: {},
        contentMix: {},
        children: [],
        isStatic: false
    };

    containerFunctions = {
        onVisible: this.onVisible.bind(this)
    };

    onVisible() {
        const { changeHeaderState, onVisible } = this.props;

        changeHeaderState({
            name: POPUP,
            title: this._getPopupTitle(),
            onCloseClick: () => {
                history.back();
            }
        });

        onVisible();
    }

    containerProps() {
        const {
            activeOverlay,
            areOtherOverlaysOpen,
            changeHeaderState,
            children,
            id,
            isMobile,
            isStatic,
            mix,
            contentMix,
            onClose,
            onVisible,
            hideActiveOverlay,
            goToPreviousNavigationState
        } = this.props;

        return {
            activeOverlay,
            areOtherOverlaysOpen,
            changeHeaderState,
            children,
            id,
            isMobile,
            isStatic,
            mix,
            contentMix,
            onClose,
            onVisible,
            hideActiveOverlay,
            goToPreviousNavigationState,
            title: this._getPopupTitle()
        };
    }

    _getPopupTitle() {
        const { payload, activeOverlay } = this.props;
        const { title } = payload[activeOverlay] || {};

        return title;
    }

    render() {
        return (
            <Popup
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
