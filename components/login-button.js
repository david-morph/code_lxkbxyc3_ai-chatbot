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
exports.LoginButton = LoginButton;
const React = __importStar(require("react"));
const react_1 = require("next-auth/react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
function LoginButton({ text = 'Login with GitHub', showGithubIcon = true, className, ...props }) {
    const [isLoading, setIsLoading] = React.useState(false);
    return (<button_1.Button variant="outline" onClick={() => {
            setIsLoading(true);
            // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
            (0, react_1.signIn)('github', { callbackUrl: `/` });
        }} disabled={isLoading} className={(0, utils_1.cn)(className)} {...props}>
      {isLoading ? (<icons_1.IconSpinner className="mr-2 animate-spin"/>) : showGithubIcon ? (<icons_1.IconGitHub className="mr-2"/>) : null}
      {text}
    </button_1.Button>);
}
//# sourceMappingURL=login-button.js.map