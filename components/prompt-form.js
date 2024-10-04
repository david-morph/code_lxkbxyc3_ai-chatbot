'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptForm = PromptForm;
const React = __importStar(require("react"));
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const rsc_1 = require("ai/rsc");
const message_1 = require("./stocks/message");
const button_1 = require("@/components/ui/button");
const icons_1 = require("@/components/ui/icons");
const tooltip_1 = require("@/components/ui/tooltip");
const use_enter_submit_1 = require("@/lib/hooks/use-enter-submit");
const nanoid_1 = require("nanoid");
const navigation_1 = require("next/navigation");
function PromptForm({ input, setInput }) {
    const router = (0, navigation_1.useRouter)();
    const { formRef, onKeyDown } = (0, use_enter_submit_1.useEnterSubmit)();
    const inputRef = React.useRef(null);
    const { submitUserMessage } = (0, rsc_1.useActions)();
    const [_, setMessages] = (0, rsc_1.useUIState)();
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (<form ref={formRef} onSubmit={async (e) => {
            e.preventDefault();
            // Blur focus on mobile
            if (window.innerWidth < 600) {
                e.target['message']?.blur();
            }
            const value = input.trim();
            setInput('');
            if (!value)
                return;
            // Optimistically add user message UI
            setMessages(currentMessages => [
                ...currentMessages,
                {
                    id: (0, nanoid_1.nanoid)(),
                    display: <message_1.UserMessage>{value}</message_1.UserMessage>
                }
            ]);
            // Submit and get response message
            const responseMessage = await submitUserMessage(value);
            setMessages(currentMessages => [...currentMessages, responseMessage]);
        }}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <tooltip_1.Tooltip>
          <tooltip_1.TooltipTrigger asChild>
            <button_1.Button variant="outline" size="icon" className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4" onClick={() => {
            router.push('/new');
        }}>
              <icons_1.IconPlus />
              <span className="sr-only">New Chat</span>
            </button_1.Button>
          </tooltip_1.TooltipTrigger>
          <tooltip_1.TooltipContent>New Chat</tooltip_1.TooltipContent>
        </tooltip_1.Tooltip>
        <react_textarea_autosize_1.default ref={inputRef} tabIndex={0} onKeyDown={onKeyDown} placeholder="Send a message." className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm" autoFocus spellCheck={false} autoComplete="off" autoCorrect="off" name="message" rows={1} value={input} onChange={e => setInput(e.target.value)}/>
        <div className="absolute right-0 top-[13px] sm:right-4">
          <tooltip_1.Tooltip>
            <tooltip_1.TooltipTrigger asChild>
              <button_1.Button type="submit" size="icon" disabled={input === ''}>
                <icons_1.IconArrowElbow />
                <span className="sr-only">Send message</span>
              </button_1.Button>
            </tooltip_1.TooltipTrigger>
            <tooltip_1.TooltipContent>Send message</tooltip_1.TooltipContent>
          </tooltip_1.Tooltip>
        </div>
      </div>
    </form>);
}
//# sourceMappingURL=prompt-form.js.map