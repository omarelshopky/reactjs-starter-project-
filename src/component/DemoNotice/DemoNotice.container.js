/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { connect } from "react-redux";

import DemoNotice from "./DemoNotice.component";

/** @namespace Component/DemoNotice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isDemoNoticeEnabled: state.ConfigReducer.demo_notice,
    device: state.ConfigReducer.device
});

/** @namespace Component/DemoNotice/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DemoNotice);
