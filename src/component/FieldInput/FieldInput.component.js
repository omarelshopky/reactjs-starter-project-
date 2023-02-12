/* eslint-disable no-unused-vars */
/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

/** @namespace Component/FieldInput/Component */
export class FieldInput extends PureComponent {
    static propTypes = {
        formRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        validateSeparately: PropTypes.bool,
        isSubmitted: PropTypes.bool,
        fileExtensions: PropTypes.string,
        filename: PropTypes.string
    };

    static defaultProps = {
        formRef: () => {},
        validateSeparately: false,
        isSubmitted: false,
        fileExtensions: "",
        filename: ""
    };

    render() {
        const {
            formRef,
            validateSeparately,
            isSubmitted,
            fileExtensions,
            filename,
            ...validProps
        } = this.props;

        return (
            <input
                ref={ formRef }
                { ...validProps }
            />
        );
    }
}

export default FieldInput;
