'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatShareDialog = ChatShareDialog;
const React = __importStar(require("react"));
const sonner_1 = require("sonner");
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const icons_1 = require("@/components/ui/icons");
const use_copy_to_clipboard_1 = require("@/lib/hooks/use-copy-to-clipboard");
function ChatShareDialog({ chat, shareChat, onCopy, ...props }) {
    const { copyToClipboard } = (0, use_copy_to_clipboard_1.useCopyToClipboard)({ timeout: 1000 });
    const [isSharePending, startShareTransition] = React.useTransition();
    const copyShareLink = React.useCallback(async (chat) => {
        if (!chat.sharePath) {
            return sonner_1.toast.error('Could not copy share link to clipboard');
        }
        const url = new URL(window.location.href);
        url.pathname = chat.sharePath;
        copyToClipboard(url.toString());
        onCopy();
        sonner_1.toast.success('Share link copied to clipboard');
    }, [copyToClipboard, onCopy]);
    return (<dialog_1.Dialog {...props}>
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Share link to chat</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {chat.messages.length} messages
          </div>
        </div>
        <dialog_1.DialogFooter className="items-center">
          <button_1.Button disabled={isSharePending} onClick={() => {
            // @ts-ignore
            startShareTransition(async () => {
                const result = await shareChat(chat.id);
                if (result && 'error' in result) {
                    sonner_1.toast.error(result.error);
                    return;
                }
                copyShareLink(result);
            });
        }}>
            {isSharePending ? (<>
                <icons_1.IconSpinner className="mr-2 animate-spin"/>
                Copying...
              </>) : (<>Copy link</>)}
          </button_1.Button>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=chat-share-dialog.js.map