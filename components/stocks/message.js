'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessage = UserMessage;
exports.BotMessage = BotMessage;
exports.BotCard = BotCard;
exports.SystemMessage = SystemMessage;
exports.SpinnerMessage = SpinnerMessage;
const icons_1 = require("@/components/ui/icons");
const utils_1 = require("@/lib/utils");
const spinner_1 = require("./spinner");
const codeblock_1 = require("../ui/codeblock");
const markdown_1 = require("../markdown");
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const remark_math_1 = __importDefault(require("remark-math"));
const use_streamable_text_1 = require("@/lib/hooks/use-streamable-text");
// Different types of message bubbles.
function UserMessage({ children }) {
    return (<div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <icons_1.IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>);
}
function BotMessage({ content, className }) {
    const text = (0, use_streamable_text_1.useStreamableText)(content);
    return (<div className={(0, utils_1.cn)('group relative flex items-start md:-ml-12', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <icons_1.IconOpenAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <markdown_1.MemoizedReactMarkdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0" remarkPlugins={[remark_gfm_1.default, remark_math_1.default]} components={{
            p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
                if (children.length) {
                    if (children[0] == '▍') {
                        return (<span className="mt-1 animate-pulse cursor-default">▍</span>);
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
          {text}
        </markdown_1.MemoizedReactMarkdown>
      </div>
    </div>);
}
function BotCard({ children, showAvatar = true }) {
    return (<div className="group relative flex items-start md:-ml-12">
      <div className={(0, utils_1.cn)('flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm', !showAvatar && 'invisible')}>
        <icons_1.IconOpenAI />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>);
}
function SystemMessage({ children }) {
    return (<div className={'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'}>
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>);
}
function SpinnerMessage() {
    return (<div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <icons_1.IconOpenAI />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner_1.spinner}
      </div>
    </div>);
}
//# sourceMappingURL=message.js.map