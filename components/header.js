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
exports.Header = Header;
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const auth_1 = require("@/auth");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
const user_menu_1 = require("@/components/user-menu");
const sidebar_mobile_1 = require("./sidebar-mobile");
const sidebar_toggle_1 = require("./sidebar-toggle");
const chat_history_1 = require("./chat-history");
async function UserOrLogin() {
    const session = (await (0, auth_1.auth)());
    return (<>
      {session?.user ? (<>
          <sidebar_mobile_1.SidebarMobile>
            <chat_history_1.ChatHistory userId={session.user.id}/>
          </sidebar_mobile_1.SidebarMobile>
          <sidebar_toggle_1.SidebarToggle />
        </>) : (<link_1.default href="/new" rel="nofollow">
          <icons_1.IconNextChat className="size-6 mr-2 dark:hidden" inverted/>
          <icons_1.IconNextChat className="hidden size-6 mr-2 dark:block"/>
        </link_1.default>)}
      <div className="flex items-center">
        <icons_1.IconSeparator className="size-6 text-muted-foreground/50"/>
        {session?.user ? (<user_menu_1.UserMenu user={session.user}/>) : (<button_1.Button variant="link" asChild className="-ml-2">
            <link_1.default href="/login">Login</link_1.default>
          </button_1.Button>)}
      </div>
    </>);
}
function Header() {
    return (<header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto"/>}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a target="_blank" href="https://github.com/vercel/nextjs-ai-chatbot/" rel="noopener noreferrer" className={(0, utils_1.cn)((0, button_1.buttonVariants)({ variant: 'outline' }))}>
          <icons_1.IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
        <a href="https://vercel.com/templates/Next.js/nextjs-ai-chatbot" target="_blank" className={(0, utils_1.cn)((0, button_1.buttonVariants)())}>
          <icons_1.IconVercel className="mr-2"/>
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div>
    </header>);
}
//# sourceMappingURL=header.js.map