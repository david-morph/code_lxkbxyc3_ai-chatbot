"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyScreen = EmptyScreen;
const external_link_1 = require("@/components/external-link");
function EmptyScreen() {
    return (<div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Next.js AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{' '}
          <external_link_1.ExternalLink href="https://nextjs.org">Next.js</external_link_1.ExternalLink>, the{' '}
          <external_link_1.ExternalLink href="https://sdk.vercel.ai">
            Vercel AI SDK
          </external_link_1.ExternalLink>
          , and{' '}
          <external_link_1.ExternalLink href="https://vercel.com/storage/kv">
            Vercel KV
          </external_link_1.ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{' '}
          <external_link_1.ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </external_link_1.ExternalLink>{' '}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>
      </div>
    </div>);
}
//# sourceMappingURL=empty-screen.js.map