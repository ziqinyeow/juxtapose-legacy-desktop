"use client";

import { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Tags, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

import { Media } from "./data/schema";
import { labels } from "./data/data";
import { useCallback, useState } from "react";
import fs from "fs";
import { deleteFromJSONFile } from "@/lib/json";
import useData from "@/context/media";
import { IconLayoutCollage } from "@tabler/icons-react";
import Video from "../video";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [view, setView] = useState(false);
  const { refresh } = useData();
  const media = Media.parse(row.original);

  const del = useCallback(() => {
    fs.unlink(media?.path, () => {});
    deleteFromJSONFile("./media/index.json", media?.id);
    refresh();
  }, []);

  return (
    <>
      <Dialog open={view} onOpenChange={setView}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent className="z-[110]">
          <DialogHeader>
            <DialogTitle>
              <span className="mb-4 text-xl">{media?.name}</span>
            </DialogTitle>
            {/* <DialogDescription></DialogDescription> */}
            <div className="">
              <Video src={media?.path} type={media?.label} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onSelect={() => {
              setView(true);
            }}
          >
            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconLayoutCollage className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Dashboard
          </DropdownMenuItem>

          {/* <DropdownMenuItem>
          <Star className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Favorite
        </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tags className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Labels
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={media.label}>
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={del}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
