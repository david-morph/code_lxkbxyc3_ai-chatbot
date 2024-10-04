"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStreamableText = void 0;
const rsc_1 = require("ai/rsc");
const react_1 = require("react");
const useStreamableText = (content) => {
    const [rawContent, setRawContent] = (0, react_1.useState)(typeof content === 'string' ? content : '');
    (0, react_1.useEffect)(() => {
        ;
        (async () => {
            if (typeof content === 'object') {
                let value = '';
                for await (const delta of (0, rsc_1.readStreamableValue)(content)) {
                    if (typeof delta === 'string') {
                        setRawContent((value = value + delta));
                    }
                }
            }
        })();
    }, [content]);
    return rawContent;
};
exports.useStreamableText = useStreamableText;
//# sourceMappingURL=use-streamable-text.js.map