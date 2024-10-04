'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageActions = ChatMessageActions;
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
const use_copy_to_clipboard_1 = require("@/lib/hooks/use-copy-to-clipboard");
const utils_1 = require("@/lib/utils");
function ChatMessageActions({ message, className, ...props }) {
    const { isCopied, copyToClipboard } = (0, use_copy_to_clipboard_1.useCopyToClipboard)({ timeout: 2000 });
    const onCopy = () => {
        if (isCopied)
            return;
        copyToClipboard(message.content);
    };
    return (<div className={(0, utils_1.cn)('flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0', className)} {...props}>
      <button_1.Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <icons_1.IconCheck /> : <icons_1.IconCopy />}
        <span className="sr-only">Copy message</span>
      </button_1.Button>
    </div>);
}
//# sourceMappingURL=chat-message-actions.js.map