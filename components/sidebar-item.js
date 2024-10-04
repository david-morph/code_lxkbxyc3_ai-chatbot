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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = SidebarItem;
const React = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const framer_motion_1 = require("framer-motion");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
const tooltip_1 = require("@/components/ui/tooltip");
const use_local_storage_1 = require("@/lib/hooks/use-local-storage");
const utils_1 = require("@/lib/utils");
function SidebarItem({ index, chat, children }) {
    const pathname = (0, navigation_1.usePathname)();
    const isActive = pathname === chat.path;
    const [newChatId, setNewChatId] = (0, use_local_storage_1.useLocalStorage)('newChatId', null);
    const shouldAnimate = index === 0 && isActive && newChatId;
    if (!chat?.id)
        return null;
    return (<framer_motion_1.motion.div className="relative h-8" variants={{
            initial: {
                height: 0,
                opacity: 0
            },
            animate: {
                height: 'auto',
                opacity: 1
            }
        }} initial={shouldAnimate ? 'initial' : undefined} animate={shouldAnimate ? 'animate' : undefined} transition={{
            duration: 0.25,
            ease: 'easeIn'
        }}>
      <div className="absolute left-2 top-1 flex size-6 items-center justify-center">
        {chat.sharePath ? (<tooltip_1.Tooltip delayDuration={1000}>
            <tooltip_1.TooltipTrigger tabIndex={-1} className="focus:bg-muted focus:ring-1 focus:ring-ring">
              <icons_1.IconUsers className="mr-2 mt-1 text-zinc-500"/>
            </tooltip_1.TooltipTrigger>
            <tooltip_1.TooltipContent>This is a shared chat.</tooltip_1.TooltipContent>
          </tooltip_1.Tooltip>) : (<icons_1.IconMessage className="mr-2 mt-1 text-zinc-500"/>)}
      </div>
      <link_1.default href={chat.path} className={(0, utils_1.cn)((0, button_1.buttonVariants)({ variant: 'ghost' }), 'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10', isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800')}>
        <div className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all" title={chat.title}>
          <span className="whitespace-nowrap">
            {shouldAnimate ? (chat.title.split('').map((character, index) => (<framer_motion_1.motion.span key={index} variants={{
                initial: {
                    opacity: 0,
                    x: -100
                },
                animate: {
                    opacity: 1,
                    x: 0
                }
            }} initial={shouldAnimate ? 'initial' : undefined} animate={shouldAnimate ? 'animate' : undefined} transition={{
                duration: 0.25,
                ease: 'easeIn',
                delay: index * 0.05,
                staggerChildren: 0.05
            }} onAnimationComplete={() => {
                if (index === chat.title.length - 1) {
                    setNewChatId(null);
                }
            }}>
                  {character}
                </framer_motion_1.motion.span>))) : (<span>{chat.title}</span>)}
          </span>
        </div>
      </link_1.default>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </framer_motion_1.motion.div>);
}
//# sourceMappingURL=sidebar-item.js.map