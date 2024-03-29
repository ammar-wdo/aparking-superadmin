"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { cn } from "@/lib/utils"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function EntitiesDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {


  const [columnFilters, setColumnFilters] =useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {

      
      columnFilters,
      sorting,
    },
  })

  return (
    <div className="">

<div className="space-y-1 mb-3 flex gap-3 items-center ">
    <h5 className="text-xs text-neutral-500">Filter by status</h5>
    <div>
    <Select
       value={table.getColumn("isActive")?.getFilterValue() === true ?"true" : table.getColumn("isActive")?.getFilterValue()===false ? "false" : "no filter"}
       onValueChange={(event) =>
        table.getColumn("isActive")?.setFilterValue(event==='true' ? true : event==="false" ? false : '')
       }
    >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="No filter" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem className={cn("cursor-pointer text-stone-400 hover:text-neutral-400" )}value={'no filter'}>No filter</SelectItem>
    <SelectItem key={1} className="cursor-pointer" value={"true"}>Active</SelectItem>
    <SelectItem  className="cursor-pointer" value={"false"}>inActive</SelectItem>
 
  </SelectContent>
</Select>
    </div>

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
    </div>
  )
}
