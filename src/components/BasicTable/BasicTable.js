import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";


const TruncatedCell = ({ children, maxWidth }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const text = children.toString();

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? text : text.slice(0, 100);

    return (
        <TableCell
            style={{
                maxWidth: maxWidth,
                wordBreak: "break-word",
                fontSize: "0.8rem",
                padding: "8px",
            }}
        >
            {displayText}
            {text.length > 100 && (
                <span
                    style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                    onClick={toggleExpand}
                >
                    {isExpanded ? "[숨기기]" : "..."}
                </span>
            )}
        </TableCell>
    );
};

const BasicTable = ({ titles, rows }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Paper style={{ width: '90%', maxWidth: '600px', overflow: 'hidden' }}>
                <TableContainer component={(props) => <Paper {...props} elevation={5} />} style={{ maxHeight: 400 }}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                {titles.map((title, index) => (
                                    <TableCell key={index} style={{ width: `${100 / titles.length}%`, fontSize: '0.9rem' }}>
                                        {title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.length > 0 ? (
                                rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {Object.values(row).map((cell, cellIndex) => (
                                            <TruncatedCell key={cellIndex} maxWidth={`${100 / titles.length}%`}>
                                                {cell}
                                            </TruncatedCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={titles.length} align="center">
                                        No results found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default BasicTable;