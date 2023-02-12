/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */

import { PureComponent } from "react";
import { connect } from "react-redux";

import { customerType } from "type/Account";

import MyAccountDashboard from "./MyAccountDashboard.component";

/** @namespace Component/MyAccountDashboard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer
});

/** @namespace Component/MyAccountDashboard/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountDashboard/Container */
export class MyAccountDashboardContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
    };

    containerProps() {
        const { customer } = this.props;

        return { customer };
    }

    render() {
        return (
            <MyAccountDashboard
                { ...this.containerProps() }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountDashboardContainer);
