"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatList = ChatList;
const separator_1 = require("@/components/ui/separator");
const link_1 = __importDefault(require("next/link"));
const react_icons_1 = require("@radix-ui/react-icons");
function ChatList({ messages, session, isShared }) {
    if (!messages.length) {
        return null;
    }
    return (<div className="relative mx-auto max-w-2xl px-4">
      {!isShared && !session ? (<>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
              <react_icons_1.ExclamationTriangleIcon />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-muted-foreground leading-normal">
                Please{' '}
                <link_1.default href="/login" className="underline">
                  log in
                </link_1.default>{' '}
                or{' '}
                <link_1.default href="/signup" className="underline">
                  sign up
                </link_1.default>{' '}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
          <separator_1.Separator className="my-4"/>
        </>) : null}

      {messages.map((message, index) => (<div key={message.id}>
          {message.display}
          {index < messages.length - 1 && <separator_1.Separator className="my-4"/>}
        </div>))}
    </div>);
}
//# sourceMappingURL=chat-list.js.map