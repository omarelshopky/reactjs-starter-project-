/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import "intersection-observer";

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { InView } from "react-intersection-observer";

import { ChildrenType } from "type/Common";
import { isCrawler, isSSR } from "util/Browser";

import "./RenderWhenVisible.style.scss";

/** @namespace Component/RenderWhenVisible/Component */
export class RenderWhenVisible extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        fallback: PropTypes.func
    };

    static defaultProps = {
        fallback: () => {}
    };

    state = {
        wasVisible: false
    };

    classList = cn("RenderWhenVisible");

    constructor(props) {
        super(props);

        // A hack to determine if the element is on screen or not imidiatelly
        setTimeout(this.checkIsVisible, 0);
    }

    checkIsVisible = () => {
        if (!this.node) {
            return;
        }

        const rect = this.node.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
            this.setState({ wasVisible: true });
        }
    };

    shouldRender() {
        const { wasVisible } = this.state;

        return !wasVisible && !isSSR() && !isCrawler();
    }

    handleVisibilityToggle = (isVisible) => {
        const { wasVisible } = this.state;

        if (!wasVisible && isVisible) {
            this.setState({ wasVisible: true });
        }
    };

    renderFallback() {
        const { fallback } = this.props;
        const fallbackRender = fallback();

        if (fallbackRender) {
            return fallbackRender;
        }

        return (
            <div className={ this.classList("Detector") } />
        );
    }

    renderVisibilitySensor() {
        return (
            <InView onChange={ this.handleVisibilityToggle }>
                { this.renderFallback() }
            </InView>
        );
    }

    renderChildren() {
        const { children } = this.props;

        return children;
    }

    renderContent() {
        if (this.shouldRender()) {
            return this.renderVisibilitySensor();
        }

        return this.renderChildren();
    }

    render() {
        return (
            <div
                className={ this.classList() }
                ref={ (node) => {
                    this.node = node;
                } }
            >
                { this.renderContent() }
            </div>
        );
    }
}

export default RenderWhenVisible;
