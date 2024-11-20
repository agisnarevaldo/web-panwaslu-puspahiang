import {TableCell, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

interface SkeletonTableProps {
    columns: number;
    rows: number;
    cellWidths?: string[];
}

export default function SkeletonTable({ columns, rows, cellWidths }: SkeletonTableProps) {
    const defaultWidth = `${100 / columns}%`;

    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                            <Skeleton
                                className="h-4"
                                style={{ width: cellWidths?.[colIndex] || defaultWidth }}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}