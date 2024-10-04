"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMenu = UserMenu;
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const auth_1 = require("@/auth");
function getUserInitials(name) {
    const [firstName, lastName] = name.split(' ');
    return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2);
}
function UserMenu({ user }) {
    return (<div className="flex items-center justify-between">
      <dropdown_menu_1.DropdownMenu>
        <dropdown_menu_1.DropdownMenuTrigger asChild>
          <button_1.Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(user.email)}
            </div>
            <span className="ml-2 hidden md:block">{user.email}</span>
          </button_1.Button>
        </dropdown_menu_1.DropdownMenuTrigger>
        <dropdown_menu_1.DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <dropdown_menu_1.DropdownMenuItem className="flex-col items-start">
            <div className="text-xs text-zinc-500">{user.email}</div>
          </dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuSeparator />
          <form action={async () => {
            'use server';
            await (0, auth_1.signOut)();
        }}>
            <button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Sign Out
            </button>
          </form>
        </dropdown_menu_1.DropdownMenuContent>
      </dropdown_menu_1.DropdownMenu>
    </div>);
}
//# sourceMappingURL=user-menu.js.map