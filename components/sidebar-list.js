"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarList = SidebarList;
const actions_1 = require("@/app/actions");
const clear_history_1 = require("@/components/clear-history");
const sidebar_items_1 = require("@/components/sidebar-items");
const theme_toggle_1 = require("@/components/theme-toggle");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const loadChats = (0, react_1.cache)(async (userId) => {
    return await (0, actions_1.getChats)(userId);
});
async function SidebarList({ userId }) {
    const chats = await loadChats(userId);
    if (!chats || 'error' in chats) {
        (0, navigation_1.redirect)('/');
    }
    else {
        return (<div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {chats?.length ? (<div className="space-y-2 px-2">
              <sidebar_items_1.SidebarItems chats={chats}/>
            </div>) : (<div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No chat history</p>
            </div>)}
        </div>
        <div className="flex items-center justify-between p-4">
          <theme_toggle_1.ThemeToggle />
          <clear_history_1.ClearHistory clearChats={actions_1.clearChats} isEnabled={chats?.length > 0}/>
        </div>
      </div>);
    }
}
//# sourceMappingURL=sidebar-list.js.map