'use server';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.authenticate = authenticate;
const auth_1 = require("@/auth");
const next_auth_1 = require("next-auth");
const zod_1 = require("zod");
const kv_1 = require("@vercel/kv");
const utils_1 = require("@/lib/utils");
async function getUser(email) {
    const user = await kv_1.kv.hgetall(`user:${email}`);
    return user;
}
async function authenticate(_prevState, formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        const parsedCredentials = zod_1.z
            .object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6)
        })
            .safeParse({
            email,
            password
        });
        if (parsedCredentials.success) {
            await (0, auth_1.signIn)('credentials', {
                email,
                password,
                redirect: false
            });
            return {
                type: 'success',
                resultCode: utils_1.ResultCode.UserLoggedIn
            };
        }
        else {
            return {
                type: 'error',
                resultCode: utils_1.ResultCode.InvalidCredentials
            };
        }
    }
    catch (error) {
        if (error instanceof next_auth_1.AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        type: 'error',
                        resultCode: utils_1.ResultCode.InvalidCredentials
                    };
                default:
                    return {
                        type: 'error',
                        resultCode: utils_1.ResultCode.UnknownError
                    };
            }
        }
    }
}
//# sourceMappingURL=actions.js.map