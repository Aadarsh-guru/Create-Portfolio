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
import { Skill } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateSkillModel from "./CreateSkillModel";
import EditSkillModel from "./EditSkillModel";
import { toast } from "@/components/ui/use-toast";
import { deleteSkillAction } from "@/actions/skill";
import ConfirmModel from "@/components/shared/ConfirmModel";


export const columns: ColumnDef<Skill>[] = [
    {
        accessorKey: "skillName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Skill
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "expertise",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expertise
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "edit-action",
        cell: ({ row }) => {
            const { id, skillName, expertise } = row.original;
            return (
                <EditSkillModel skillId={id} skillName={skillName} expertise={expertise} />
            )
        }
    },
    {
        id: "delete-action",
        cell: ({ row }) => {
            const { id } = row.original;
            const handleDelete = async () => {
                const { success, message } = await deleteSkillAction({ skillId: id });
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


interface SkillsTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function SkillsTable<TData, TValue>({
    columns,
    data,
}: SkillsTableProps<TData, TValue>) {

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
                    placeholder="Filter skills..."
                    value={(table.getColumn("skillName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("skillName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <CreateSkillModel />
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

export default SkillsTable;