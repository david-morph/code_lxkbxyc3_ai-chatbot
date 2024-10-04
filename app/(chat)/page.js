"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = IndexPage;
const utils_1 = require("@/lib/utils");
const chat_1 = require("@/components/chat");
const actions_1 = require("@/lib/chat/actions");
const auth_1 = require("@/auth");
const actions_2 = require("@/app/actions");
exports.metadata = {
    title: 'Next.js AI Chatbot'
};
async function IndexPage() {
    const id = (0, utils_1.nanoid)();
    const session = (await (0, auth_1.auth)());
    const missingKeys = await (0, actions_2.getMissingKeys)();
    return (<actions_1.AI initialAIState={{ chatId: id, messages: [] }}>
      <chat_1.Chat id={id} session={session} missingKeys={missingKeys}/>
    </actions_1.AI>);
}
//# sourceMappingURL=page.js.map