/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import PropTypes from "prop-types";
import { PureComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { stringify } from "rebem-classname";

import { ChildrenType } from "type/Common";

/** @namespace Component/Link/Component */
export class Link extends PureComponent {
    static propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        className: PropTypes.string,
        bemProps: PropTypes.shape({}),
        children: ChildrenType.isRequired,
        onClick: PropTypes.func,
        isOpenInNewTab: PropTypes.bool
    };

    static defaultProps = {
        bemProps: {},
        className: "",
        onClick: () => {},
        isOpenInNewTab: false
    };

    scrollToElement = (e) => {
        const {
            to: cssIdentifier,
            onClick
        } = this.props;

        const elem = document.querySelector(
            cssIdentifier !== "#" ? cssIdentifier : "body"
        );

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();

        window.scrollTo({
            top: elem.offsetTop,
            behavior: "smooth"
        });

        elem.focus();

        onClick(e);
    };

    renderRelativePathLink() {
        const {
            isOpenInNewTab,
            children,
            to,
            ...props
        } = this.props;

        if (isOpenInNewTab) {
            return (
                <a
                    { ...props }
                    onClick={ this.scrollToElement }
                    href={ to }
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    { children }
                </a>
            );
        }

        return (
            <a
                { ...props }
                onClick={ this.scrollToElement }
                href={ to }
            >
                { children }
            </a>
        );
    }

    renderAbsolutePathLink = (classNameConverted) => {
        const {
            isOpenInNewTab,
            children,
            to,
            // eslint-disable-next-line no-unused-vars
            bemProps,
            ...props
        } = this.props;

        if (isOpenInNewTab) {
            return (
                <a
                    { ...props }
                    href={ to }
                    className={ classNameConverted }
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    { children }
                </a>
            );
        }

        return (
            <a
                { ...props }
                href={ to }
                className={ classNameConverted }
            >
                { children }
            </a>
        );
    };

    render() {
        const {
            // eslint-disable-next-line no-unused-vars
            isOpenInNewTab,
            className,
            bemProps,
            children,
            to,
            ...props
        } = this.props;

        if (!to) {
            return (
                <div { ...props } { ...bemProps }>
                    { children }
                </div>
            );
        }

        if (/^#/.test(to)) {
            return this.renderRelativePathLink();
        }

        const classNameConverted = `${ className } ${ stringify(bemProps)}`;

        if (/^https?:\/\//.test(to)) {
            return this.renderAbsolutePathLink(classNameConverted);
        }

        return (
            <RouterLink
                { ...props }
                to={ to }
                className={ classNameConverted }
            >
                { children }
            </RouterLink>
        );
    }
}

export default Link;
