import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown";
import { LogOut, PlusCircle } from "lucide-react";
import { CreditCard, Settings, User } from "lucide-react";
import Image from "next/image";

export default function UserAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center w-full">
        <Image
          src={`/images/profile.jpeg`}
          width={20}
          height={20}
          alt="avatar"
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`name`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {`email`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-xs">
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            <span className="text-xs">Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="w-4 h-4 mr-2" />
            <span className="text-xs">Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            <span className="text-xs">Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className="w-4 h-4 mr-2" />
            <span className="text-xs">New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => {}}>
          <LogOut className="w-4 h-4 mr-2" />
          <span className="text-xs">Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
