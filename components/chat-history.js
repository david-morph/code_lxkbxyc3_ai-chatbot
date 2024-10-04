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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHistory = ChatHistory;
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const sidebar_list_1 = require("@/components/sidebar-list");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
async function ChatHistory({ userId }) {
    return (<div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
      </div>
      <div className="mb-2 px-2">
        <link_1.default href="/" className={(0, utils_1.cn)((0, button_1.buttonVariants)({ variant: 'outline' }), 'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10')}>
          <icons_1.IconPlus className="-translate-x-2 stroke-2"/>
          New Chat
        </link_1.default>
      </div>
      <React.Suspense fallback={<div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (<div key={i} className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"/>))}
          </div>}>
        {/* @ts-ignore */}
        <sidebar_list_1.SidebarList userId={userId}/>
      </React.Suspense>
    </div>);
}
//# sourceMappingURL=chat-history.js.map