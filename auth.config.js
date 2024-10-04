"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        newUser: '/signup'
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');
            const isOnSignupPage = nextUrl.pathname.startsWith('/signup');
            if (isLoggedIn) {
                if (isOnLoginPage || isOnSignupPage) {
                    return Response.redirect(new URL('/', nextUrl));
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token = { ...token, id: user.id };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                const { id } = token;
                const { user } = session;
                session = { ...session, user: { ...user, id } };
            }
            return session;
        }
    },
    providers: []
};
//# sourceMappingURL=auth.config.js.map