"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferredRegion = exports.runtime = void 0;
exports.generateMetadata = generateMetadata;
exports.default = SharePage;
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const actions_1 = require("@/app/actions");
const chat_list_1 = require("@/components/chat-list");
const footer_1 = require("@/components/footer");
const actions_2 = require("@/lib/chat/actions");
exports.runtime = 'edge';
exports.preferredRegion = 'home';
async function generateMetadata({ params }) {
    const chat = await (0, actions_1.getSharedChat)(params.id);
    return {
        title: chat?.title.slice(0, 50) ?? 'Chat'
    };
}
async function SharePage({ params }) {
    const chat = await (0, actions_1.getSharedChat)(params.id);
    if (!chat || !chat?.sharePath) {
        (0, navigation_1.notFound)();
    }
    const uiState = (0, actions_2.getUIStateFromAIState)(chat);
    return (<>
      <div className="flex-1 space-y-6">
        <div className="border-b bg-background px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1>
              <div className="text-sm text-muted-foreground">
                {(0, utils_1.formatDate)(chat.createdAt)} · {chat.messages.length} messages
              </div>
            </div>
          </div>
        </div>
        <actions_2.AI>
          <chat_list_1.ChatList messages={uiState} isShared={true}/>
        </actions_2.AI>
      </div>
      <footer_1.FooterText className="py-8"/>
    </>);
}
//# sourceMappingURL=page.js.map