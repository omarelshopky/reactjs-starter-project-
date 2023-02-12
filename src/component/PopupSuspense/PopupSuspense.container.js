/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { connect } from "react-redux";

import { toggleOverlayByKey } from "store/Overlay/Overlay.action";

import PopupSuspense from "./PopupSuspense.component";

/** @namespace Component/PopupSuspense/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/PopupSuspense/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupSuspense);
