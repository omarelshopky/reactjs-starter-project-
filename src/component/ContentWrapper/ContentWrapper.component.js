/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { PureComponent } from "react";

import { ChildrenType, MixType } from "type/Common";

import "./ContentWrapper.style.scss";

/**
 * Content Wrapper
 * @class ContentWrapper
 * @namespace Component/ContentWrapper/Component
 */
export class ContentWrapper extends PureComponent {
    static propTypes = {
        children: ChildrenType,
        mix: MixType,
        wrapperMix: PropTypes.shape({
            block: PropTypes.string,
            elem: PropTypes.string
        }),
        label: PropTypes.string,
        isNotSection: PropTypes.bool
    };

    static defaultProps = {
        mix: {},
        wrapperMix: {},
        children: null,
        isNotSection: false
    };

    classList = cn("ContentWrapper");

    renderContentWrapper() {
        const {
            children, wrapperMix
        } = this.props;

        const mixClass = cn(wrapperMix.block);

        return (
            <div className={ this.classList({}, [mixClass(wrapperMix.elem)]) }>
                { children }
            </div>
        );
    }

    render() {
        const {
            mix, label, isNotSection
        } = this.props;

        if (isNotSection) {
            return this.renderContentWrapper();
        }

        return (
            <section className={ this.classList({}, mix) } aria-label={ label }>
                { this.renderContentWrapper() }
            </section>
        );
    }
}

export default ContentWrapper;
