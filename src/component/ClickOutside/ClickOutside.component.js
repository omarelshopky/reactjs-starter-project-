/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import {
    Children,
    cloneElement,
    createRef,
    PureComponent
} from "react";

import { ChildrenType } from "type/Common";

/** @namespace Component/ClickOutside/Component */
export class ClickOutside extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        children: ChildrenType
    };

    static defaultProps = {
        onClick: () => {},
        children: []
    };

    constructor(props) {
        super(props);

        const { children } = this.props;

        this.childrenRefs = Children.map(
            children,
            () => createRef()
        );
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
    }

    handleClick = ({ target }) => {
        const { onClick } = this.props;

        if (this.childrenRefs.every(
            (ref) => {
                const elementRef = ref.current?.overlayRef?.current || ref.current;

                return !elementRef.contains(target);
            }
        )) {
            onClick();
        }
    };

    render() {
        const { children } = this.props;

        return Children.map(children, (element, idx) => (
            cloneElement(element, { ref: this.childrenRefs[idx] })
        ));
    }
}

export default ClickOutside;
