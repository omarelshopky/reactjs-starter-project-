const path = require("path")

/* eslint-disable no-undef */
module.exports = {
    style: {
        sass: {
            loaderOptions: {
                additionalData: (content, loaderContext) => {
                    if (!content.includes("src/style/main") && !loaderContext.resourcePath.includes("src/style")) {
                        return `
                        @import "src/style/main";
                        ${content}`;
                    }

                    return content;
                },
            }
        }
    }
};