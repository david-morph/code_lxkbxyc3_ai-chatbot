"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarDesktop = SidebarDesktop;
const sidebar_1 = require("@/components/sidebar");
const auth_1 = require("@/auth");
const chat_history_1 = require("@/components/chat-history");
async function SidebarDesktop() {
    const session = await (0, auth_1.auth)();
    if (!session?.user?.id) {
        return null;
    }
    return (<sidebar_1.Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <chat_history_1.ChatHistory userId={session.user.id}/>
    </sidebar_1.Sidebar>);
}
//# sourceMappingURL=sidebar-desktop.js.map