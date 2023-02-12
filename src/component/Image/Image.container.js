/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";

import { MixType } from "type/Common";

import Image from "./Image.component";

/** @namespace Component/Image/Container */
export class ImageContainer extends PureComponent {
    static propTypes = {
        isPlaceholder: PropTypes.bool,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        style: PropTypes.shape({}),
        width: PropTypes.string,
        height: PropTypes.string,
        alt: PropTypes.string,
        ratio: PropTypes.oneOf([
            "4x3",
            "16x9",
            "square",
            "custom"
        ]),
        mix: MixType,
        className: PropTypes.string,
        imageRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]),
        title: PropTypes.string,
        isPlain: PropTypes.bool
    };

    static defaultProps = {
        src: "",
        alt: "",
        ratio: "square",
        mix: {},
        height: "",
        width: "",
        isPlaceholder: false,
        style: {},
        title: null,
        className: "",
        imageRef: () => {},
        isPlain: false
    };

    containerProps() {
        const {
            isPlaceholder,
            src,
            title,
            alt,
            className,
            ratio,
            mix,
            imageRef,
            isPlain
        } = this.props;

        return {
            style: this._getStyle(),
            wrapperSize: this._getWrapperSize(),
            isPlaceholder,
            src,
            title,
            alt,
            className,
            ratio,
            mix,
            imageRef,
            isPlain
        };
    }

    _parseSize(size) {
        const trimmedSize = size.trim();

        if (!trimmedSize) {
            return "100%";
        }

        const PX_LENGTH = -2;
        const PERCENT_LENGTH = -1;

        if (
            trimmedSize.slice(PX_LENGTH) === "px"
            || trimmedSize.slice(PERCENT_LENGTH) === "%"
        ) {
            return trimmedSize;
        }

        return `${trimmedSize}px`;
    }

    _getCorrectSize() {
        const { width, height } = this.props;

        const correctHeight = this._parseSize(height);
        const correctWidth = this._parseSize(width);

        return { width: correctWidth, height: correctHeight };
    }

    _getStyle() {
        const { style } = this.props;

        return { ...this._getCorrectSize(), ...style };
    }

    _getWrapperSize() {
        const size = this._getCorrectSize();
        const { height, width } = size;

        if (height.slice(-1) === "%" && width.slice(-1) === "%") {
            return {};
        }

        return height.slice(-1) !== "%"
            ? { paddingBottom: height }
            : { paddingBottom: width };
    }

    render() {
        return (
            <Image
                { ...this.containerProps() }
            />
        );
    }
}

export default ImageContainer;
