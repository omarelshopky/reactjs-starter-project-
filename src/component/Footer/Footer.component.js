/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import { cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Component } from "react";

import ContentWrapper from "component/ContentWrapper";
import Image from "component/Image";
import Link from "component/Link";
import { DeviceType } from "type/Device";

import { COLUMN_MAP } from "./Footer.config";

import "./Footer.style.scss";

/**
 * Page footer
 * @class Footer
 * @namespace Component/Footer/Component
 */
export class Footer extends Component {
    static propTypes = {
        copyright: PropTypes.string,
        isVisibleOnMobile: PropTypes.bool,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        copyright: "",
        isVisibleOnMobile: false
    };

    renderMap = {
        // [RENDER_NEWSLETTER]: {
        // Render: this.renderNewsletterSubscriptionBlock.bind(this)
        // }
    };

    classList = cn("Footer");

    shouldComponentUpdate(nextProps) {
        const {
            device: {
                isMobile
            },
            isVisibleOnMobile
        } = this.props;

        const {
            device: {
                isMobile: nextIsMobile
            },
            isVisibleOnMobile: nextIsVisibleOnMobile
        } = nextProps;

        return isMobile !== nextIsMobile || isVisibleOnMobile !== nextIsVisibleOnMobile;
    }

    renderColumnItemContent(src, title) {
        if (!src) {
            return title;
        }

        return (
            <Image
                mix={ { block: "Footer", elem: "ColumnItemImage" } }
                src={ src }
            />
        );
    }

    renderColumnItemLink = ({ href = "/", title, src }, i) => {
        const mods = src ? { type: "image" } : {};

        return (
            <Link
                // eslint-disable-next-line react/forbid-component-props
                className={ this.classList("ColumnItem", mods) }
                to={ href }
                key={ i }
                aria-label={ title }
            >
                { this.renderColumnItemContent(src, title) }
            </Link>
        );
    };

    renderColumnItem = (item, i) => {
        const { render } = item;

        if (render) {
            return this.renderMap[render].render(item, i);
        }

        return this.renderColumnItemLink(item, i);
    };

    renderColumn = (column, i) => {
        const {
            title,
            columnActiveKey,
            items,
            isItemsHorizontal,
            mods = {}
        } = column;

        const contentMods = isItemsHorizontal ? { direction: "horizontal" } : {};

        const { [columnActiveKey]: isColumnActive } = this.props;

        if (columnActiveKey && !isColumnActive === true) {
            return null;
        }

        return (
            <div className={ this.classList("Column", mods) } key={ i }>
                <h3 className={ this.classList("ColumnTitle") }>
                    { title }
                </h3>
                <div className={ this.classList("ColumnContent", contentMods) }>
                    { items.map(this.renderColumnItem) }
                </div>
            </div>
        );
    };

    renderColumns() {
        return (
            <ContentWrapper
                isNotSection
                wrapperMix={ { block: "Footer", elem: "Columns" } }
                label=""
            >
                { COLUMN_MAP.map(this.renderColumn) }
            </ContentWrapper>
        );
    }

    renderContent() {
        return (
            <div className={ this.classList("Content") }>
                { this.renderColumns() }
            </div>
        );
    }

    renderCopyrightContent() {
        const { copyright } = this.props;

        return (
            <ContentWrapper
                mix={ { block: "Footer", elem: "CopyrightContentWrapper" } }
                wrapperMix={ { block: "Footer", elem: "CopyrightContent" } }
                label=""
            >
                <span className={ this.classList("Copyright") }>
                    { copyright }
                    { " Powered by " }
                    <a href="#">
                        DarkTech
                    </a>
                </span>
            </ContentWrapper>
        );
    }

    render() {
        const { isVisibleOnMobile, device } = this.props;

        if (!isVisibleOnMobile && device.isMobile) {
            return null;
        }

        if (isVisibleOnMobile && !device.isMobile) {
            return null;
        }

        return (
            <footer className={ this.classList() } aria-label="Footer">
                { this.renderContent() }
                { this.renderCopyrightContent() }
            </footer>
        );
    }
}

export default Footer;
