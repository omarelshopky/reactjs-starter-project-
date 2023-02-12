/*
 * @category  StarterProject
 * @author    Omar Elshopky <omar.elshopky202@gmail.com | info@cyberusorg.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2023 Cyberus Org, Inc (https://cyberusorg.com)
 */

import facebookIcon from "style/logos/facebook.svg";
import linkedinIcon from "style/logos/linkedIn.svg";
import twitterIcon from "style/logos/twitter.svg";

export const COLUMN_MAP = [
    {
        title: "About",
        items: [
            {
                href: "/about-us",
                title: "About Us"
            }
        ]
    },
    {
        title: "Follow",
        isItemsHorizontal: true,
        items: [
            {
                href: "https://www.linkedin.com/company/",
                src: linkedinIcon,
                title: "LinkedIn"
            },
            {
                href: "https://www.facebook.com/",
                src: facebookIcon,
                title: "Facebook"
            },
            {
                href: "https://twitter.com/",
                src: twitterIcon,
                title: "Twitter"
            }
        ]
    }
];
