"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const auth_1 = require("@/auth");
const login_form_1 = __importDefault(require("@/components/login-form"));
const navigation_1 = require("next/navigation");
async function LoginPage() {
    const session = (await (0, auth_1.auth)());
    if (session) {
        (0, navigation_1.redirect)('/');
    }
    return (<main className="flex flex-col p-4">
      <login_form_1.default />
    </main>);
}
//# sourceMappingURL=page.js.map