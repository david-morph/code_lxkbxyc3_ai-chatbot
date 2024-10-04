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
exports.ThemeToggle = ThemeToggle;
const React = __importStar(require("react"));
const next_themes_1 = require("next-themes");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
function ThemeToggle() {
    const { setTheme, theme } = (0, next_themes_1.useTheme)();
    const [_, startTransition] = React.useTransition();
    return (<button_1.Button variant="ghost" size="icon" onClick={() => {
            startTransition(() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
            });
        }}>
      {!theme ? null : theme === 'dark' ? (<icons_1.IconMoon className="transition-all"/>) : (<icons_1.IconSun className="transition-all"/>)}
      <span className="sr-only">Toggle theme</span>
    </button_1.Button>);
}
//# sourceMappingURL=theme-toggle.js.map