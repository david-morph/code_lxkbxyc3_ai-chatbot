"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupPage;
const auth_1 = require("@/auth");
const signup_form_1 = __importDefault(require("@/components/signup-form"));
const navigation_1 = require("next/navigation");
async function SignupPage() {
    const session = (await (0, auth_1.auth)());
    if (session) {
        (0, navigation_1.redirect)('/');
    }
    return (<main className="flex flex-col p-4">
      <signup_form_1.default />
    </main>);
}
//# sourceMappingURL=page.js.map