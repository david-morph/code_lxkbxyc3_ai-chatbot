"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.auth = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const auth_config_1 = require("./auth.config");
const zod_1 = require("zod");
const utils_1 = require("./lib/utils");
const actions_1 = require("./app/login/actions");
_a = (0, next_auth_1.default)({
    ...auth_config_1.authConfig,
    providers: [
        (0, credentials_1.default)({
            async authorize(credentials) {
                const parsedCredentials = zod_1.z
                    .object({
                    email: zod_1.z.string().email(),
                    password: zod_1.z.string().min(6)
                })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await (0, actions_1.getUser)(email);
                    if (!user)
                        return null;
                    const encoder = new TextEncoder();
                    const saltedPassword = encoder.encode(password + user.salt);
                    const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);
                    const hashedPassword = (0, utils_1.getStringFromBuffer)(hashedPasswordBuffer);
                    if (hashedPassword === user.password) {
                        return user;
                    }
                    else {
                        return null;
                    }
                }
                return null;
            }
        })
    ]
}), exports.auth = _a.auth, exports.signIn = _a.signIn, exports.signOut = _a.signOut;
//# sourceMappingURL=auth.js.map