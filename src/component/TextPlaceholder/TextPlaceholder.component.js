/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import { MixType } from "type/Common";

import "./TextPlaceholder.style.scss";

/**
 * Text placeholder
 * @class TextPlaceholder
 * @namespace Component/TextPlaceholder/Component
 */
export class TextPlaceholder extends PureComponent {
    static propTypes = {
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number
        ]),
        length: PropTypes.oneOf([
            "block",
            "short",
            "medium",
            "long",
            "paragraph",
            "custom"
        ]),
        mix: MixType
    };

    static defaultProps = {
        content: "",
        length: "short",
        mix: {}
    };

    classList = cn("TextPlaceholder");

    render() {
        const { content, length, mix } = this.props;
        if (content) {
            return content;
        }

        const mixClass = cn(mix.block);

        return <span className={ this.classList({ length }, [mixClass(mix.elem, mix.mods)]) }  />;
    }
}

export default TextPlaceholder;
