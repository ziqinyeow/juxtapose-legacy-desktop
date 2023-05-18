"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { categories, formats, labels, priorities, statuses } from "./data/data";
import { Media } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Image, Video } from "lucide-react";
import Selection from "@/components/Select";
import { editFromJSONFile } from "@/lib/json";
import { MEDIA_STORAGE } from "@/lib/constant";
import useData from "@/context/media";

export const columns: ColumnDef<Media>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && (
            <>
              {label?.label === "Video" && (
                <Badge
                  variant="outline"
                  className="flex gap-1 whitespace-nowrap bg-blue-50"
                >
                  <Video className="w-3 h-3 text-blue-500" />
                  <span className="">{label.label}</span>
                </Badge>
              )}
              {label?.label === "Image" && (
                <Badge
                  variant="outline"
                  className="flex gap-1 whitespace-nowrap bg-green-50"
                >
                  <Image className="w-3 h-3 text-green-500" />
                  <span className="">{label.label}</span>
                </Badge>
              )}
            </>
          )}

          <span className="max-w-[200px] font-medium truncate ">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "date",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date Added" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[200px] truncate">
  //           {new Date(row.getValue("date"))?.toDateString()}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "size",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Media Size" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="truncate">
  //           {Number(row.getValue("size")).toFixed(1)} MB
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "format",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Format" />
    ),
    cell: ({ row }) => {
      const format = formats.find((d) => d.value === row.getValue("format"));

      if (!format) {
        return null;
      }

      return (
        <div className="flex items-center">
          {format.icon && (
            <format.icon className="w-4 h-4 mr-2 text-muted-foreground" />
          )}
          <span>{format.label}</span>
          <Badge
            variant="outline"
            className="ml-2 text-gray-400 whitespace-nowrap"
          >
            {Number(row.original?.size)?.toFixed(1)} mb
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const { refresh } = useData();
      const category = categories.find(
        (d) => d.value === row.getValue("category")
      );

      if (!category) {
        return null;
      }

      return (
        <Selection
          defaultValue={category?.value}
          onValueChange={(e) => {
            const id = row.original.id;
            editFromJSONFile(MEDIA_STORAGE, id, { category: e });
            refresh();
          }}
          list={categories}
        />
        // <div className="flex w-[100px] items-center">
        //   {category.icon && (
        //     <category.icon className="w-4 h-4 mr-2 text-muted-foreground" />
        //   )}
        //   <span>{category.label}</span>
        // </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { refresh } = useData();
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <Selection
          defaultValue={status?.value}
          onValueChange={(e) => {
            const id = row.original.id;
            editFromJSONFile(MEDIA_STORAGE, id, { status: e });
            refresh();
          }}
          list={statuses}
        />
        // <div className="flex w-[100px] items-center">
        //   {status.icon && (
        //     <status.icon className="w-4 h-4 mr-2 text-muted-foreground" />
        //   )}
        //   <span>{status.label}</span>
        // </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="w-4 h-4 mr-2 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
