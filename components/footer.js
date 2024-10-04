"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterText = FooterText;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const external_link_1 = require("@/components/external-link");
function FooterText({ className, ...props }) {
    return (<p className={(0, utils_1.cn)('px-2 text-center text-xs leading-normal text-muted-foreground', className)} {...props}>
      Open source AI chatbot built with{' '}
      <external_link_1.ExternalLink href="https://nextjs.org">Next.js</external_link_1.ExternalLink> and{' '}
      <external_link_1.ExternalLink href="https://github.com/vercel/ai">
        Vercel AI SDK
      </external_link_1.ExternalLink>
      .
    </p>);
}
//# sourceMappingURL=footer.js.map