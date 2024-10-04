'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItems = SidebarItems;
const framer_motion_1 = require("framer-motion");
const actions_1 = require("@/app/actions");
const sidebar_actions_1 = require("@/components/sidebar-actions");
const sidebar_item_1 = require("@/components/sidebar-item");
function SidebarItems({ chats }) {
    if (!chats?.length)
        return null;
    return (<framer_motion_1.AnimatePresence>
      {chats.map((chat, index) => chat && (<framer_motion_1.motion.div key={chat?.id} exit={{
                opacity: 0,
                height: 0
            }}>
              <sidebar_item_1.SidebarItem index={index} chat={chat}>
                <sidebar_actions_1.SidebarActions chat={chat} removeChat={actions_1.removeChat} shareChat={actions_1.shareChat}/>
              </sidebar_item_1.SidebarItem>
            </framer_motion_1.motion.div>))}
    </framer_motion_1.AnimatePresence>);
}
//# sourceMappingURL=sidebar-items.js.map