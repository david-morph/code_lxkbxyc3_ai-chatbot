'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMobile = SidebarMobile;
const sheet_1 = require("@/components/ui/sheet");
const sidebar_1 = require("@/components/sidebar");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
function SidebarMobile({ children }) {
    return (<sheet_1.Sheet>
      <sheet_1.SheetTrigger asChild>
        <button_1.Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">
          <icons_1.IconSidebar className="size-6"/>
          <span className="sr-only">Toggle Sidebar</span>
        </button_1.Button>
      </sheet_1.SheetTrigger>
      <sheet_1.SheetContent side="left" className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <sidebar_1.Sidebar className="flex">{children}</sidebar_1.Sidebar>
      </sheet_1.SheetContent>
    </sheet_1.Sheet>);
}
//# sourceMappingURL=sidebar-mobile.js.map