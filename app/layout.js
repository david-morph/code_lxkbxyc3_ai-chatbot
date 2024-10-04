"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewport = exports.metadata = void 0;
exports.default = RootLayout;
const sans_1 = require("geist/font/sans");
const mono_1 = require("geist/font/mono");
require("@/app/globals.css");
const utils_1 = require("@/lib/utils");
const tailwind_indicator_1 = require("@/components/tailwind-indicator");
const providers_1 = require("@/components/providers");
const header_1 = require("@/components/header");
const sonner_1 = require("@/components/ui/sonner");
exports.metadata = {
    metadataBase: process.env.VERCEL_URL
        ? new URL(`https://${process.env.VERCEL_URL}`)
        : undefined,
    title: {
        default: 'Next.js AI Chatbot',
        template: `%s - Next.js AI Chatbot`
    },
    description: 'An AI-powered chatbot template built with Next.js and Vercel.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    }
};
exports.viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
};
function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={(0, utils_1.cn)('font-sans antialiased', sans_1.GeistSans.variable, mono_1.GeistMono.variable)}>
        <sonner_1.Toaster position="top-center"/>
        <providers_1.Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <header_1.Header />
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
          </div>
          <tailwind_indicator_1.TailwindIndicator />
        </providers_1.Providers>
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map