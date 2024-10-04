"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatLayout;
const sidebar_desktop_1 = require("@/components/sidebar-desktop");
async function ChatLayout({ children }) {
    return (<div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <sidebar_desktop_1.SidebarDesktop />
      {children}
    </div>);
}
//# sourceMappingURL=layout.js.map