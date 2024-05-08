"use client"
import * as React from "react";
import {
    ArrowUpDown,
    Trash
} from "lucide-react";
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SocialUrl } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateSocialLinkModel from "./CreateSocialLinkModel";
import { toast } from "@/components/ui/use-toast";
import ConfirmModel from "@/components/shared/ConfirmModel";
import { deleteSocialLinkAction } from "@/actions/social";
import EditSocialLinkModel from "./EditSocialLinkModel";


export const columns: ColumnDef<SocialUrl>[] = [
    {
        accessorKey: "provider",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Provider
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "url",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    URL
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { url } = row.original;
            return (
                <p>
                    {url.substring(0, 25)}...
                </p>
            )
        }
    },
    {
        id: "edit-action",
        cell: ({ row }) => {
            const { id, url, provider } = row.original;
            return (
                <EditSocialLinkModel socialId={id} url={url} provider={provider} />
            )
        }
    },
    {
        id: "delete-action",
        cell: ({ row }) => {
            const { id } = row.original;
            const handleDelete = async () => {
                const { success, message } = await deleteSocialLinkAction({ socialId: id });
                if (success) {
                    toast({
                        title: message,
                    });
                };
            };
            return (
                <ConfirmModel onConfirm={handleDelete} >
                    <Button variant={'ghost'} size={'icon'} className="cursor-pointer" >
                        <Trash className="h-4 w-4" />
                    </Button>
                </ConfirmModel>
            )
        }
    },
];


interface SocialTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function SocialTable<TData, TValue>({
    columns,
    data,
}: SocialTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div>
            <div className="flex flex-wrap gap-4 md:gap-0 items-center py-4 justify-between">
                <Input
                    placeholder="Filter links..."
                    value={(table.getColumn("provider")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("provider")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <CreateSocialLinkModel />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SocialTable;