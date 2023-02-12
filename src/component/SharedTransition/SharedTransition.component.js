/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, PureComponent } from "react";

import { SHARED_ELEMENT_TRANSITION } from "./SharedTransition.config";

import "./SharedTransition.style.scss";

/** @namespace Component/SharedTransition/Component */
export class SharedTransition extends PureComponent {
    static propTypes = {
        state: PropTypes.shape({
            startingPosition: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
                start: PropTypes.number,
                top: PropTypes.number
            }),
            destinationPosition: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
                start: PropTypes.number,
                top: PropTypes.number
            }),
            sharedElementDestination: PropTypes.object,
            sharedElement: PropTypes.object
        }).isRequired,
        cleanUpTransition: PropTypes.func.isRequired
    };

    sharedContainer = createRef();

    animationSpeed = SHARED_ELEMENT_TRANSITION;

    setDestinationTransform = this.setTransform.bind(this, "destinationPosition");

    setStartingTransform = this.setTransform.bind(this, "startingPosition");

    classList = cn("SharedTransition");

    componentDidUpdate() {
        if (this.transitionInAction) {
            return;
        }
        this.updateSharedElement();
    }

    setTransform(key) {
        const {
            state: {
                [key]: {
                    width,
                    height,
                    left,
                    top
                }
            }
        } = this.props;

        this.sharedContainer.current.style.cssText = `
            --shared-element-width: ${width}px;
            --shared-element-height: ${height}px;
            --shared-element-top: ${top}px;
            --shared-element-start: ${left}px;
            --shared-element-animation-speed: ${this.animationSpeed}ms;
        `;
    }

    cleanUpTransition = () => {
        const { current: wrapper } = this.sharedContainer;
        const { cleanUpTransition } = this.props;

        const range = document.createRange();
        range.selectNodeContents(wrapper);
        range.deleteContents();

        this.transitionInAction = false;
        cleanUpTransition();
    };

    updateSharedElement() {
        const {
            state: {
                sharedElementDestination,
                sharedElement
            }
        } = this.props;

        const { current: wrapper } = this.sharedContainer;

        if (
            !sharedElement
            || !sharedElementDestination
            || !wrapper
        ) {
            // This.cleanUpTransition();
            return;
        }

        this.transitionInAction = true;
        this.setStartingTransform();
        wrapper.appendChild(sharedElement);
        setTimeout(this.setDestinationTransform, 0);
        setTimeout(this.cleanUpTransition, this.animationSpeed);
    }

    render() {
        const { state: { sharedElement } } = this.props;

        return (
            <div
                className={ this.classList({ isVisible: !!sharedElement } ) }
                ref={ this.sharedContainer }
            />
        );
    }
}

export default SharedTransition;
