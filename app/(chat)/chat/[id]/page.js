"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMetadata = generateMetadata;
exports.default = ChatPage;
const navigation_1 = require("next/navigation");
const auth_1 = require("@/auth");
const actions_1 = require("@/app/actions");
const chat_1 = require("@/components/chat");
const actions_2 = require("@/lib/chat/actions");
async function generateMetadata({ params }) {
    const session = await (0, auth_1.auth)();
    if (!session?.user) {
        return {};
    }
    const chat = await (0, actions_1.getChat)(params.id, session.user.id);
    if (!chat || 'error' in chat) {
        (0, navigation_1.redirect)('/');
    }
    else {
        return {
            title: chat?.title.toString().slice(0, 50) ?? 'Chat'
        };
    }
}
async function ChatPage({ params }) {
    const session = (await (0, auth_1.auth)());
    const missingKeys = await (0, actions_1.getMissingKeys)();
    if (!session?.user) {
        (0, navigation_1.redirect)(`/login?next=/chat/${params.id}`);
    }
    const userId = session.user.id;
    const chat = await (0, actions_1.getChat)(params.id, userId);
    if (!chat || 'error' in chat) {
        (0, navigation_1.redirect)('/');
    }
    else {
        if (chat?.userId !== session?.user?.id) {
            (0, navigation_1.notFound)();
        }
        return (<actions_2.AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
        <chat_1.Chat id={chat.id} session={session} initialMessages={chat.messages} missingKeys={missingKeys}/>
      </actions_2.AI>);
    }
}
//# sourceMappingURL=page.js.map