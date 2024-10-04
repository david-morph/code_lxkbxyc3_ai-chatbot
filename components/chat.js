'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = Chat;
const utils_1 = require("@/lib/utils");
const chat_list_1 = require("@/components/chat-list");
const chat_panel_1 = require("@/components/chat-panel");
const empty_screen_1 = require("@/components/empty-screen");
const use_local_storage_1 = require("@/lib/hooks/use-local-storage");
const react_1 = require("react");
const rsc_1 = require("ai/rsc");
const navigation_1 = require("next/navigation");
const use_scroll_anchor_1 = require("@/lib/hooks/use-scroll-anchor");
const sonner_1 = require("sonner");
function Chat({ id, className, session, missingKeys }) {
    const router = (0, navigation_1.useRouter)();
    const path = (0, navigation_1.usePathname)();
    const [input, setInput] = (0, react_1.useState)('');
    const [messages] = (0, rsc_1.useUIState)();
    const [aiState] = (0, rsc_1.useAIState)();
    const [_, setNewChatId] = (0, use_local_storage_1.useLocalStorage)('newChatId', id);
    (0, react_1.useEffect)(() => {
        if (session?.user) {
            if (!path.includes('chat') && messages.length === 1) {
                window.history.replaceState({}, '', `/chat/${id}`);
            }
        }
    }, [id, path, session?.user, messages]);
    (0, react_1.useEffect)(() => {
        const messagesLength = aiState.messages?.length;
        if (messagesLength === 2) {
            router.refresh();
        }
    }, [aiState.messages, router]);
    (0, react_1.useEffect)(() => {
        setNewChatId(id);
    });
    (0, react_1.useEffect)(() => {
        missingKeys.map(key => {
            sonner_1.toast.error(`Missing ${key} environment variable!`);
        });
    }, [missingKeys]);
    const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = (0, use_scroll_anchor_1.useScrollAnchor)();
    return (<div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]" ref={scrollRef}>
      <div className={(0, utils_1.cn)('pb-[200px] pt-4 md:pt-10', className)} ref={messagesRef}>
        {messages.length ? (<chat_list_1.ChatList messages={messages} isShared={false} session={session}/>) : (<empty_screen_1.EmptyScreen />)}
        <div className="w-full h-px" ref={visibilityRef}/>
      </div>
      <chat_panel_1.ChatPanel id={id} input={input} setInput={setInput} isAtBottom={isAtBottom} scrollToBottom={scrollToBottom}/>
    </div>);
}
//# sourceMappingURL=chat.js.map