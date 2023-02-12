/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 * @link https://github.com/scandipwa/base-theme
 */
import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { createRef, PureComponent } from "react";

import AddIcon from "component/AddIcon";
import ChevronIcon from "component/ChevronIcon";
import { BOTTOM, TOP } from "component/ChevronIcon/ChevronIcon.config";
import MinusIcon from "component/MinusIcon";
import TextPlaceholder from "component/TextPlaceholder";
import { ChildrenType, MixType } from "type/Common";
import { DeviceType } from "type/Device";
import { isCrawler, isSSR } from "util/Browser";
import { getFixedElementHeight } from "util/CSS";

import "./ExpandableContent.style.scss";

/** @namespace Component/ExpandableContent/Component */
export class ExpandableContent extends PureComponent {
    static propTypes = {
        isContentExpanded: PropTypes.bool,
        isArrow: PropTypes.bool,
        heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        children: ChildrenType,
        mix: MixType.isRequired,
        mods: PropTypes.object,
        device: DeviceType.isRequired,
        onClick: (props, propName, componentName) => {
            const propValue = props[propName];
            if (propValue === null) {
                return;
            }
            if (typeof propValue === "function") {
                return;
            }
            throw new Error(`${componentName} only accepts null or string`);
        }
    };

    static defaultProps = {
        heading: "",
        isContentExpanded: false,
        onClick: null,
        children: [],
        isArrow: false,
        mods: {}
    };

    expandableContentRef = createRef();

    classList = cn("ExpandableContent");

    constructor(props) {
        super(props);
        const { isContentExpanded } = this.props;

        const isForceExpanded = isSSR() || isCrawler();

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            isContentExpanded: isForceExpanded || isContentExpanded,
            // eslint-disable-next-line react/no-unused-state
            prevIsContentExpanded: isContentExpanded
        };
    }

    static getDerivedStateFromProps({ isContentExpanded }, { prevIsContentExpanded }) {
        if (isContentExpanded !== prevIsContentExpanded) {
            return {
                prevIsContentExpanded: isContentExpanded,
                isContentExpanded
            };
        }

        return null;
    }

    // eslint-disable-next-line complexity
    scrollToExpandedContent() {
        const { isContentExpanded } = this.state;
        const elem = this.expandableContentRef && this.expandableContentRef.current;

        if (isContentExpanded && !elem) {
            return;
        }

        const elemToWindowTopDist = elem.getBoundingClientRect().top;
        const windowToPageTopDist = document.body.getBoundingClientRect().top;
        const topToElemDistance = elemToWindowTopDist - windowToPageTopDist;
        const {
            total: totalFixedElementHeight,
            bottom: bottomFixedElementHeight
        } = getFixedElementHeight();

        const elemMaxOffsetHeight = screen.height > elem.offsetHeight + bottomFixedElementHeight
            ? elem.offsetHeight
            : screen.height - totalFixedElementHeight;
        const scrollTo = topToElemDistance - (screen.height - bottomFixedElementHeight - elemMaxOffsetHeight);

        // Checking if button is in a view-port
        if (-windowToPageTopDist >= scrollTo) {
            return;
        }

        window.scrollTo({ behavior: "smooth", top: scrollTo });
    }

    toggleExpand = () => {
        const { onClick } = this.props;
        if (onClick) {
            onClick();

            return;
        }
        this.setState(
            ({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }),
            () => this.scrollToExpandedContent()
        );
    };

    renderButton() {
        const { isContentExpanded } = this.state;
        const { heading, mix } = this.props;

        const mixClass = cn(mix.block);

        return (
            <div
                role="button"
                tabIndex={ 0 }
                // eslint-disable-next-line max-len
                className={ this.classList("Button", { isContentExpanded }, [mixClass("ExpandableContentButton", mix.mods)]) }
                onClick={ this.toggleExpand }
                onKeyDown={ this.toggleExpand }
            >
                <div className={ this.classList("Heading", null, [mixClass("ExpandableContentHeading", mix.mods)] ) }>
                    { typeof heading === "string" ? (
                        <TextPlaceholder content={ heading } length="medium" />
                    ) : (
                        heading
                    ) }
                </div>
                { this.renderButtonIcon() }
            </div>
        );
    }

    renderButtonIcon() {
        const { isContentExpanded } = this.state;
        const { isArrow, device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        if (isArrow) {
            return <ChevronIcon direction={ isContentExpanded ? TOP : BOTTOM } />;
        }

        return this.renderTogglePlusMinus();
    }

    renderTogglePlusMinus() {
        const { isContentExpanded } = this.state;

        if (isContentExpanded) {
            return <MinusIcon />;
        }

        return <AddIcon />;
    }

    renderContent() {
        const { children, mix } = this.props;
        const { isContentExpanded } = this.state;
        const mods = { isContentExpanded };

        const mixClass = cn(mix.block);

        return (
            <div className={ this.classList("Content", mods, [mixClass(mix.elem, "ExpandableContentContent", mods)]) }>
                { children }
            </div>
        );
    }

    render() {
        const { mix, mods } = this.props;

        const mixClass = cn(mix.block);

        return (
            <article 
                className={ this.classList(mods, [mixClass(mix.elem, mix.mods)]) }
                ref={ this.expandableContentRef }
            >
                { this.renderButton() }
                { this.renderContent() }
            </article>
        );
    }
}
export default ExpandableContent;
