import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

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
                wordBreak: 'break-word',
                fontSize: '0.8rem',
                padding: '8px',
            }}
        >
            {displayText}
            {text.length > 100 && (
                <span
                    style={{
                        color: 'blue',
                        cursor: 'pointer',
                        marginLeft: '5px',
                    }}
                    onClick={toggleExpand}
                >
                    {isExpanded ? '[숨기기]' : '...'}
                </span>
            )}
        </TableCell>
    );
};

const DrawerTable = ({ titles, rows }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const visibleColumns = [
        'pay_price',
        'service_name',
        'pay_date',
        'pay_type',
        'pay_no',
    ];

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
            <Paper
                style={{ width: '90%', maxWidth: '600px', overflow: 'hidden' }}
            >
                <TableContainer
                    component={(props) => <Paper {...props} elevation={5} />}
                    style={{ maxHeight: 400 }}
                >
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                {titles
                                    .filter((title) =>
                                        visibleColumns.includes(
                                            title
                                                .toLowerCase()
                                                .replace(/ /g, '_'),
                                        ),
                                    )
                                    .map((title, index) => (
                                        <TableCell
                                            key={index}
                                            style={{
                                                width: `${
                                                    100 / visibleColumns.length
                                                }%`,
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            {title}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows.length > 0 ? (
                                rows.map((row, rowIndex) => (
                                    <TableRow
                                        key={rowIndex}
                                        onClick={() => handleRowClick(row)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {visibleColumns.map(
                                            (column, cellIndex) => (
                                                <TruncatedCell
                                                    key={cellIndex}
                                                    maxWidth={`${
                                                        100 /
                                                        visibleColumns.length
                                                    }%`}
                                                >
                                                    {row[column]}
                                                </TruncatedCell>
                                            ),
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={visibleColumns.length}
                                        align="center"
                                    >
                                        No results found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    style: {
                        maxWidth: '400px',
                        width: '100%',
                        margin: '0 auto',
                    },
                }}
            >
                <List style={{ width: 250 }}>
                    {selectedRow &&
                        Object.entries(selectedRow).map(
                            ([key, value], index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={key}
                                        secondary={value}
                                    />
                                </ListItem>
                            ),
                        )}
                </List>
            </Drawer>
        </div>
    );
};

export default DrawerTable;
