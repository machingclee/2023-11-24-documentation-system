import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import { ReactNode } from "react";

export default <T,>({
    rows,
    headers,
    rowMapping,
    keyExtractor,
    size = "medium",
}: {
    size?: "small" | "medium",
    rows: T[],
    keyExtractor?: (row: T) => string,
    headers: string[],
    rowMapping: (datus: T) => ReactNode[]
}) => {
    return (
        <TableContainer component={Paper} sx={{
            "& thead": {
                "& tr": {
                    backgroundColor: "rgb(243, 246, 249)",
                }
            }
        }}>
            <Table sx={{ minWidth: 650 }} size="medium">
                <TableHead>
                    <TableRow>
                        {headers.map((h, index) => {
                            return <TableCell key={index.toString()}>{h}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        const rowData = rowMapping(row);
                        const key = keyExtractor?.(row) || "";
                        return (
                            <TableRow key={key} style={{ position: "relative" }}>
                                {rowData.map((rd, index) => {
                                    return (
                                        <TableCell key={`${key}-${index}`}>
                                            {rd || ""}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}