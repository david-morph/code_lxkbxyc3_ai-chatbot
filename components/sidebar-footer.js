"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarFooter = SidebarFooter;
const utils_1 = require("@/lib/utils");
function SidebarFooter({ children, className, ...props }) {
    return (<div className={(0, utils_1.cn)('flex items-center justify-between p-4', className)} {...props}>
      {children}
    </div>);
}
//# sourceMappingURL=sidebar-footer.js.map