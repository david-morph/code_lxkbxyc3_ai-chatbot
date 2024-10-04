'use server';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = getChats;
exports.getChat = getChat;
exports.removeChat = removeChat;
exports.clearChats = clearChats;
exports.getSharedChat = getSharedChat;
exports.shareChat = shareChat;
exports.saveChat = saveChat;
exports.refreshHistory = refreshHistory;
exports.getMissingKeys = getMissingKeys;
const cache_1 = require("next/cache");
const navigation_1 = require("next/navigation");
const kv_1 = require("@vercel/kv");
const auth_1 = require("@/auth");
async function getChats(userId) {
    const session = await (0, auth_1.auth)();
    if (!userId) {
        return [];
    }
    if (userId !== session?.user?.id) {
        return {
            error: 'Unauthorized'
        };
    }
    try {
        const pipeline = kv_1.kv.pipeline();
        const chats = await kv_1.kv.zrange(`user:chat:${userId}`, 0, -1, {
            rev: true
        });
        for (const chat of chats) {
            pipeline.hgetall(chat);
        }
        const results = await pipeline.exec();
        return results;
    }
    catch (error) {
        return [];
    }
}
async function getChat(id, userId) {
    const session = await (0, auth_1.auth)();
    if (userId !== session?.user?.id) {
        return {
            error: 'Unauthorized'
        };
    }
    const chat = await kv_1.kv.hgetall(`chat:${id}`);
    if (!chat || (userId && chat.userId !== userId)) {
        return null;
    }
    return chat;
}
async function removeChat({ id, path }) {
    const session = await (0, auth_1.auth)();
    if (!session) {
        return {
            error: 'Unauthorized'
        };
    }
    // Convert uid to string for consistent comparison with session.user.id
    const uid = String(await kv_1.kv.hget(`chat:${id}`, 'userId'));
    if (uid !== session?.user?.id) {
        return {
            error: 'Unauthorized'
        };
    }
    await kv_1.kv.del(`chat:${id}`);
    await kv_1.kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`);
    (0, cache_1.revalidatePath)('/');
    return (0, cache_1.revalidatePath)(path);
}
async function clearChats() {
    const session = await (0, auth_1.auth)();
    if (!session?.user?.id) {
        return {
            error: 'Unauthorized'
        };
    }
    const chats = await kv_1.kv.zrange(`user:chat:${session.user.id}`, 0, -1);
    if (!chats.length) {
        return (0, navigation_1.redirect)('/');
    }
    const pipeline = kv_1.kv.pipeline();
    for (const chat of chats) {
        pipeline.del(chat);
        pipeline.zrem(`user:chat:${session.user.id}`, chat);
    }
    await pipeline.exec();
    (0, cache_1.revalidatePath)('/');
    return (0, navigation_1.redirect)('/');
}
async function getSharedChat(id) {
    const chat = await kv_1.kv.hgetall(`chat:${id}`);
    if (!chat || !chat.sharePath) {
        return null;
    }
    return chat;
}
async function shareChat(id) {
    const session = await (0, auth_1.auth)();
    if (!session?.user?.id) {
        return {
            error: 'Unauthorized'
        };
    }
    const chat = await kv_1.kv.hgetall(`chat:${id}`);
    if (!chat || chat.userId !== session.user.id) {
        return {
            error: 'Something went wrong'
        };
    }
    const payload = {
        ...chat,
        sharePath: `/share/${chat.id}`
    };
    await kv_1.kv.hmset(`chat:${chat.id}`, payload);
    return payload;
}
async function saveChat(chat) {
    const session = await (0, auth_1.auth)();
    if (session && session.user) {
        const pipeline = kv_1.kv.pipeline();
        pipeline.hmset(`chat:${chat.id}`, chat);
        pipeline.zadd(`user:chat:${chat.userId}`, {
            score: Date.now(),
            member: `chat:${chat.id}`
        });
        await pipeline.exec();
    }
    else {
        return;
    }
}
async function refreshHistory(path) {
    (0, navigation_1.redirect)(path);
}
async function getMissingKeys() {
    const keysRequired = ['OPENAI_API_KEY'];
    return keysRequired
        .map(key => (process.env[key] ? '' : key))
        .filter(key => key !== '');
}
//# sourceMappingURL=actions.js.map