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
exports.ButtonScrollToBottom = ButtonScrollToBottom;
const React = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
function ButtonScrollToBottom({ className, isAtBottom, scrollToBottom, ...props }) {
    return (<button_1.Button variant="outline" size="icon" className={(0, utils_1.cn)('absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2', isAtBottom ? 'opacity-0' : 'opacity-100', className)} onClick={() => scrollToBottom()} {...props}>
      <icons_1.IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </button_1.Button>);
}
//# sourceMappingURL=button-scroll-to-bottom.js.map