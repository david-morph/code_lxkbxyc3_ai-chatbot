'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupForm;
const react_dom_1 = require("react-dom");
const actions_1 = require("@/app/signup/actions");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const sonner_1 = require("sonner");
const icons_1 = require("./ui/icons");
const utils_1 = require("@/lib/utils");
const navigation_1 = require("next/navigation");
function SignupForm() {
    const router = (0, navigation_1.useRouter)();
    const [result, dispatch] = (0, react_dom_1.useFormState)(actions_1.signup, undefined);
    (0, react_1.useEffect)(() => {
        if (result) {
            if (result.type === 'error') {
                sonner_1.toast.error((0, utils_1.getMessageFromCode)(result.resultCode));
            }
            else {
                sonner_1.toast.success((0, utils_1.getMessageFromCode)(result.resultCode));
                router.refresh();
            }
        }
    }, [result, router]);
    return (<form action={dispatch} className="flex flex-col items-center gap-4 space-y-3">
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">Sign up for an account!</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-zinc-400" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950" id="email" type="email" name="email" placeholder="Enter your email address" required/>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-zinc-400" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950" id="password" type="password" name="password" placeholder="Enter password" required minLength={6}/>
            </div>
          </div>
        </div>
        <LoginButton />
      </div>

      <link_1.default href="/login" className="flex flex-row gap-1 text-sm text-zinc-400">
        Already have an account?
        <div className="font-semibold underline">Log in</div>
      </link_1.default>
    </form>);
}
function LoginButton() {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200" aria-disabled={pending}>
      {pending ? <icons_1.IconSpinner /> : 'Create account'}
    </button>);
}
//# sourceMappingURL=signup-form.js.map