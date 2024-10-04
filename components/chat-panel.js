"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatPanel = ChatPanel;
const React = __importStar(require("react"));
const actions_1 = require("@/app/actions");
const button_1 = require("@/components/ui/button");
const prompt_form_1 = require("@/components/prompt-form");
const button_scroll_to_bottom_1 = require("@/components/button-scroll-to-bottom");
const icons_1 = require("@/components/ui/icons");
const footer_1 = require("@/components/footer");
const chat_share_dialog_1 = require("@/components/chat-share-dialog");
const rsc_1 = require("ai/rsc");
const nanoid_1 = require("nanoid");
const message_1 = require("./stocks/message");
function ChatPanel({ id, title, input, setInput, isAtBottom, scrollToBottom }) {
    const [aiState] = (0, rsc_1.useAIState)();
    const [messages, setMessages] = (0, rsc_1.useUIState)();
    const { submitUserMessage } = (0, rsc_1.useActions)();
    const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
    const exampleMessages = [
        {
            heading: 'What are the',
            subheading: 'trending memecoins today?',
            message: `What are the trending memecoins today?`
        },
        {
            heading: 'What is the price of',
            subheading: '$DOGE right now?',
            message: 'What is the price of $DOGE right now?'
        },
        {
            heading: 'I would like to buy',
            subheading: '42 $DOGE',
            message: `I would like to buy 42 $DOGE`
        },
        {
            heading: 'What are some',
            subheading: `recent events about $DOGE?`,
            message: `What are some recent events about $DOGE?`
        }
    ];
    return (<div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <button_scroll_to_bottom_1.ButtonScrollToBottom isAtBottom={isAtBottom} scrollToBottom={scrollToBottom}/>

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (<div key={example.heading} className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${index > 1 && 'hidden md:block'}`} onClick={async () => {
                    setMessages(currentMessages => [
                        ...currentMessages,
                        {
                            id: (0, nanoid_1.nanoid)(),
                            display: <message_1.UserMessage>{example.message}</message_1.UserMessage>
                        }
                    ]);
                    const responseMessage = await submitUserMessage(example.message);
                    setMessages(currentMessages => [
                        ...currentMessages,
                        responseMessage
                    ]);
                }}>
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>))}
        </div>

        {messages?.length >= 2 ? (<div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (<>
                  <button_1.Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                    <icons_1.IconShare className="mr-2"/>
                    Share
                  </button_1.Button>
                  <chat_share_dialog_1.ChatShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} onCopy={() => setShareDialogOpen(false)} shareChat={actions_1.shareChat} chat={{
                    id,
                    title,
                    messages: aiState.messages
                }}/>
                </>) : null}
            </div>
          </div>) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <prompt_form_1.PromptForm input={input} setInput={setInput}/>
          <footer_1.FooterText className="hidden sm:block"/>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=chat-panel.js.map