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
exports.ClearHistory = ClearHistory;
const React = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const sonner_1 = require("sonner");
const button_1 = require("@/components/ui/button");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const icons_1 = require("@/components/ui/icons");
function ClearHistory({ isEnabled = false, clearChats }) {
    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();
    const router = (0, navigation_1.useRouter)();
    return (<alert_dialog_1.AlertDialog open={open} onOpenChange={setOpen}>
      <alert_dialog_1.AlertDialogTrigger asChild>
        <button_1.Button variant="ghost" disabled={!isEnabled || isPending}>
          {isPending && <icons_1.IconSpinner className="mr-2"/>}
          Clear history
        </button_1.Button>
      </alert_dialog_1.AlertDialogTrigger>
      <alert_dialog_1.AlertDialogContent>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>Are you absolutely sure?</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>
            This will permanently delete your chat history and remove your data
            from our servers.
          </alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel disabled={isPending}>Cancel</alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction disabled={isPending} onClick={event => {
            event.preventDefault();
            startTransition(async () => {
                const result = await clearChats();
                if (result && 'error' in result) {
                    sonner_1.toast.error(result.error);
                    return;
                }
                setOpen(false);
            });
        }}>
            {isPending && <icons_1.IconSpinner className="mr-2 animate-spin"/>}
            Delete
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
//# sourceMappingURL=clear-history.js.map