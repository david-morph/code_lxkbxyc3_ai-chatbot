'use server';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.signup = signup;
const auth_1 = require("@/auth");
const utils_1 = require("@/lib/utils");
const zod_1 = require("zod");
const kv_1 = require("@vercel/kv");
const actions_1 = require("../login/actions");
const next_auth_1 = require("next-auth");
async function createUser(email, hashedPassword, salt) {
    const existingUser = await (0, actions_1.getUser)(email);
    if (existingUser) {
        return {
            type: 'error',
            resultCode: utils_1.ResultCode.UserAlreadyExists
        };
    }
    else {
        const user = {
            id: crypto.randomUUID(),
            email,
            password: hashedPassword,
            salt
        };
        await kv_1.kv.hmset(`user:${email}`, user);
        return {
            type: 'success',
            resultCode: utils_1.ResultCode.UserCreated
        };
    }
}
async function signup(_prevState, formData) {
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
        const salt = crypto.randomUUID();
        const encoder = new TextEncoder();
        const saltedPassword = encoder.encode(password + salt);
        const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);
        const hashedPassword = (0, utils_1.getStringFromBuffer)(hashedPasswordBuffer);
        try {
            const result = await createUser(email, hashedPassword, salt);
            if (result.resultCode === utils_1.ResultCode.UserCreated) {
                await (0, auth_1.signIn)('credentials', {
                    email,
                    password,
                    redirect: false
                });
            }
            return result;
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
            else {
                return {
                    type: 'error',
                    resultCode: utils_1.ResultCode.UnknownError
                };
            }
        }
    }
    else {
        return {
            type: 'error',
            resultCode: utils_1.ResultCode.InvalidCredentials
        };
    }
}
//# sourceMappingURL=actions.js.map