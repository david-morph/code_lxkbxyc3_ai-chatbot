"use strict";
// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = ChatMessage;
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const remark_math_1 = __importDefault(require("remark-math"));
const utils_1 = require("@/lib/utils");
const codeblock_1 = require("@/components/ui/codeblock");
const markdown_1 = require("@/components/markdown");
const icons_1 = require("@/components/ui/icons");
const chat_message_actions_1 = require("@/components/chat-message-actions");
function ChatMessage({ message, ...props }) {
    return (<div className={(0, utils_1.cn)('group relative mb-4 flex items-start md:-ml-12')} {...props}>
      <div className={(0, utils_1.cn)('flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow', message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground')}>
        {message.role === 'user' ? <icons_1.IconUser /> : <icons_1.IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <markdown_1.MemoizedReactMarkdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0" remarkPlugins={[remark_gfm_1.default, remark_math_1.default]} components={{
            p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
                if (children.length) {
                    if (children[0] == '▍') {
                        return (<span className="mt-1 cursor-default animate-pulse">▍</span>);
                    }
                    children[0] = children[0].replace('`▍`', '▍');
                }
                const match = /language-(\w+)/.exec(className || '');
                if (inline) {
                    return (<code className={className} {...props}>
                    {children}
                  </code>);
                }
                return (<codeblock_1.CodeBlock key={Math.random()} language={(match && match[1]) || ''} value={String(children).replace(/\n$/, '')} {...props}/>);
            }
        }}>
          {message.content}
        </markdown_1.MemoizedReactMarkdown>
        <chat_message_actions_1.ChatMessageActions message={message}/>
      </div>
    </div>);
}
//# sourceMappingURL=chat-message.js.map