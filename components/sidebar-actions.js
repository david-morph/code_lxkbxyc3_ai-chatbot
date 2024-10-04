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
exports.SidebarActions = SidebarActions;
const navigation_1 = require("next/navigation");
const React = __importStar(require("react"));
const sonner_1 = require("sonner");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
const chat_share_dialog_1 = require("@/components/chat-share-dialog");
const tooltip_1 = require("@/components/ui/tooltip");
function SidebarActions({ chat, removeChat, shareChat }) {
    const router = (0, navigation_1.useRouter)();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
    const [isRemovePending, startRemoveTransition] = React.useTransition();
    return (<>
      <div className="">
        <tooltip_1.Tooltip>
          <tooltip_1.TooltipTrigger asChild>
            <button_1.Button variant="ghost" className="size-7 p-0 hover:bg-background" onClick={() => setShareDialogOpen(true)}>
              <icons_1.IconShare />
              <span className="sr-only">Share</span>
            </button_1.Button>
          </tooltip_1.TooltipTrigger>
          <tooltip_1.TooltipContent>Share chat</tooltip_1.TooltipContent>
        </tooltip_1.Tooltip>
        <tooltip_1.Tooltip>
          <tooltip_1.TooltipTrigger asChild>
            <button_1.Button variant="ghost" className="size-7 p-0 hover:bg-background" disabled={isRemovePending} onClick={() => setDeleteDialogOpen(true)}>
              <icons_1.IconTrash />
              <span className="sr-only">Delete</span>
            </button_1.Button>
          </tooltip_1.TooltipTrigger>
          <tooltip_1.TooltipContent>Delete chat</tooltip_1.TooltipContent>
        </tooltip_1.Tooltip>
      </div>
      <chat_share_dialog_1.ChatShareDialog chat={chat} shareChat={shareChat} open={shareDialogOpen} onOpenChange={setShareDialogOpen} onCopy={() => setShareDialogOpen(false)}/>
      <alert_dialog_1.AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <alert_dialog_1.AlertDialogContent>
          <alert_dialog_1.AlertDialogHeader>
            <alert_dialog_1.AlertDialogTitle>Are you absolutely sure?</alert_dialog_1.AlertDialogTitle>
            <alert_dialog_1.AlertDialogDescription>
              This will permanently delete your chat message and remove your
              data from our servers.
            </alert_dialog_1.AlertDialogDescription>
          </alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogFooter>
            <alert_dialog_1.AlertDialogCancel disabled={isRemovePending}>
              Cancel
            </alert_dialog_1.AlertDialogCancel>
            <alert_dialog_1.AlertDialogAction disabled={isRemovePending} onClick={event => {
            event.preventDefault();
            // @ts-ignore
            startRemoveTransition(async () => {
                const result = await removeChat({
                    id: chat.id,
                    path: chat.path
                });
                if (result && 'error' in result) {
                    sonner_1.toast.error(result.error);
                    return;
                }
                setDeleteDialogOpen(false);
                router.refresh();
                router.push('/');
                sonner_1.toast.success('Chat deleted');
            });
        }}>
              {isRemovePending && <icons_1.IconSpinner className="mr-2 animate-spin"/>}
              Delete
            </alert_dialog_1.AlertDialogAction>
          </alert_dialog_1.AlertDialogFooter>
        </alert_dialog_1.AlertDialogContent>
      </alert_dialog_1.AlertDialog>
    </>);
}
//# sourceMappingURL=sidebar-actions.js.map