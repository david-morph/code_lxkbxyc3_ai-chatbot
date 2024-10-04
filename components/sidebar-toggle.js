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
exports.SidebarToggle = SidebarToggle;
const React = __importStar(require("react"));
const use_sidebar_1 = require("@/lib/hooks/use-sidebar");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
function SidebarToggle() {
    const { toggleSidebar } = (0, use_sidebar_1.useSidebar)();
    return (<button_1.Button variant="ghost" className="-ml-2 hidden size-9 p-0 lg:flex" onClick={() => {
            toggleSidebar();
        }}>
      <icons_1.IconSidebar className="size-6"/>
      <span className="sr-only">Toggle Sidebar</span>
    </button_1.Button>);
}
//# sourceMappingURL=sidebar-toggle.js.map