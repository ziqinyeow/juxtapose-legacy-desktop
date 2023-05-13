import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { nav } from "./layout";
import { useRouter } from "next/router";

export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const down = (e: KeyboardEvent) => {
      if (isMac && e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      } else if (!isMac && e.key === "k" && e.ctrlKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center justify-center gap-2 text-xs"
      >
        <Search className="w-4 h-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {nav?.map((n, i) => (
              <CommandItem
                onSelect={() => {
                  router.push(n?.link);
                  setOpen(false);
                }}
                key={i}
              >
                {n?.icon}
                <span className="ml-2">{n?.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          {/* <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
