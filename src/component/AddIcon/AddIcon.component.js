/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import "./AddIcon.style.scss";

/** @namespace Component/AddIcon/Component */
export class AddIcon extends PureComponent {
    static propTypes = {
        isPrimary: PropTypes.bool
    };

    static defaultProps = {
        isPrimary: false
    };

    classList = cn("AddIcon");

    render() {
        const { isPrimary } = this.props;

        return (
            <svg
                className={ this.classList({ isPrimary }) }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" />
            </svg>
        );
    }
}

export default AddIcon;
