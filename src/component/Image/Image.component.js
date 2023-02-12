/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */


import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, PureComponent } from "react";

import { MixType } from "type/Common";

import {
    IMAGE_LOADED, IMAGE_LOADING, IMAGE_NOT_FOUND, IMAGE_NOT_SPECIFIED
} from "./Image.config";

import "./Image.style.scss";

/**
 * Image component
 * Images are loaded only when they appear in a viewport
 * @class Image
 * @namespace Component/Image/Component
 */
export class Image extends PureComponent {
    static propTypes = {
        isPlaceholder: PropTypes.bool.isRequired,
        title: PropTypes.string,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        style: PropTypes.shape({
            width: PropTypes.string,
            height: PropTypes.string
        }),
        alt: PropTypes.string,
        className: PropTypes.string.isRequired,
        ratio: PropTypes.oneOf([
            "4x3",
            "16x9",
            "square",
            "custom"
        ]).isRequired,
        wrapperSize: PropTypes.shape({
            height: PropTypes.string
        }),
        mix: MixType.isRequired,
        imageRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ]).isRequired,
        isPlain: PropTypes.bool
    };

    static defaultProps = {
        alt: "",
        wrapperSize: {},
        style: {},
        title: null,
        isPlain: false
    };

    image = createRef();

    state = { imageStatus: IMAGE_LOADING };

    renderMap = {
        [IMAGE_NOT_FOUND]: this.renderImageNotFound.bind(this),
        [IMAGE_NOT_SPECIFIED]: this.renderImageNotSpecified.bind(this),
        [IMAGE_LOADING]: this.renderLoadedImage.bind(this),
        [IMAGE_LOADED]: this.renderLoadedImage.bind(this)
    };

    onError = this.onError.bind(this);

    onLoad = this.onLoad.bind(this);

    classList = cn("Image");

    componentDidMount() {
        this.onImageChange();
    }

    componentDidUpdate(prevProps) {
        const { src: prevSrc } = prevProps;
        const { src } = this.props;

        if (src !== prevSrc) {
            this.onImageChange();
        }
    }

    onImageChange() {
        const { src } = this.props;

        if (!src) {
            return this.setState({ imageStatus: IMAGE_NOT_SPECIFIED });
        }

        return this.setState({ imageStatus: IMAGE_LOADING });
    }

    // eslint-disable-next-line no-dupe-class-members
    onError() {
        this.setState({ imageStatus: IMAGE_NOT_FOUND });
    }

    // eslint-disable-next-line no-dupe-class-members
    onLoad() {
        this.setState({ imageStatus: IMAGE_LOADED });
    }

    renderImageNotFound() {
        if (navigator.onLine) {
            return (
                <span className={ this.classList("Content") }>{ "Image not found" }</span>
            );
        }

        return <span className={ this.classList("Content", { isOffline: true }) } />;
    }

    renderStyledImage() {
        const {
            alt,
            src,
            style,
            title
        } = this.props;
        const { imageStatus } = this.state;

        return (
            <img
                className={ this.classList("Image", { isLoading: imageStatus === IMAGE_LOADING }) }
                src={ src || "" }
                alt={ alt }
                style={ style }
                title={ title }
                onLoad={ this.onLoad }
                onError={ this.onError }
                loading="lazy"
            />
        );
    }

    renderPlainImage() {
        const {
            alt,
            src,
            style,
            title,
            className
        } = this.props;

        return (
            <img
                className={ className }
                src={ src || "" }
                alt={ alt }
                style={ style }
                title={ title }
                onLoad={ this.onLoad }
                onError={ this.onError }
                loading="lazy"
            />
        );
    }

    renderImageNotSpecified() {
        return (
            <span className={ this.classList("Content") }>{ "Image not specified" }</span>
        );
    }

    renderLoadedImage() {
        const { isPlain } = this.props;

        if (isPlain) {
            return this.renderPlainImage();
        }

        return this.renderStyledImage();
    }

    renderImage() {
        const { isPlaceholder } = this.props;
        const { imageStatus } = this.state;

        if (isPlaceholder) {
            return null;
        }

        const render = this.renderMap[imageStatus];

        if (!render) {
            return null;
        }

        return render();
    }

    render() {
        const {
            ratio,
            mix,
            isPlaceholder,
            wrapperSize,
            src,
            imageRef,
            className,
            isPlain
        } = this.props;

        const { imageStatus } = this.state;

        // Render image as is: without additional container and additional styles
        if (isPlain) {
            return this.renderImage();
        }

        const mixClass = cn(mix.block);

        return (
            <div
                className={ this.classList({
                    ratio,
                    imageStatus: imageStatus.toLowerCase(),
                    isPlaceholder,
                    hasSrc: !!src
                }, [mixClass(mix.elem, mix.mods), className]) }
                ref={ imageRef }
                style={ wrapperSize }
            >
                { this.renderImage() }
            </div>
        );
    }
}

export default Image;
