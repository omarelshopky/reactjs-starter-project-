/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import { DeviceType } from "type/Device";

import "./DemoNotice.style.scss";

/** @namespace Component/DemoNotice/Component */
export class DemoNotice extends PureComponent {
    static propTypes = {
        isDemoNoticeEnabled: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isDemoNoticeEnabled: false
    };

    componentDidMount() {
        this.checkForDemoNotice();
    }

    componentDidUpdate() {
        this.checkForDemoNotice();
    }

    checkForDemoNotice() {
        const { isDemoNoticeEnabled } = this.props;

        if (isDemoNoticeEnabled) {
            document.documentElement.classList.add("isDemoVisible");
        } else {
            document.documentElement.classList.remove("isDemoVisible");
        }
    }

    renderText() {
        return "This is a demo website.";
    }

    render() {
        const { isDemoNoticeEnabled } = this.props;

        if (!isDemoNoticeEnabled) {
            return null;
        }

        return (
            <div className="DemoNotice">
                { this.renderText() }
            </div>
        );
    }
}

export default DemoNotice;
