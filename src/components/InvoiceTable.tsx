import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import EditSwitch from "./EditSwitch";
import InvoiceDialog from "./InvoiceDialog";

import { maxPropsLenght } from "../utils";
import { Invoice, InvoiceLine } from "../types/Invoice";
import useRecord from "../utils/useRecord";

interface InvoiceWithIndex extends Invoice {
    index: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btn: {
            fontWeight: 'bold',
            textTransform: 'initial'
        },
    })
);

//configure which columns always to hide from table
const hiddenColumns = new Set(["invoiceLines"]);

const InvoiceTable: React.FC<{ data: Invoice[] }> = ({ data }) => {
    const classes = useStyles();

    //add custom columns to hidden list
    const [userHiddenColumns, setUserHiddenColumns] = React.useState(hiddenColumns);

    const handleColumnCheckBoxClick = (key: keyof Invoice) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSet = new Set(userHiddenColumns);
        userHiddenColumns.has(key) ? newSet.delete(key) : newSet.add(key);
        setUserHiddenColumns(newSet);
    };

    //find invoice with max number of props (in case we could have different)
    //and build table head from it's properties
    const headObject = maxPropsLenght(data);

    //editedData is our new edited json data, we can later save it to global state or send back to server
    //Process simplified by using custom hook
    const [editedData, updateRecord] = useRecord(data);

    const [dialogData, setDialogData] = React.useState<InvoiceWithIndex | null>(null);

    const openDialog = (row: InvoiceWithIndex) => (event: React.MouseEvent<HTMLElement>) => {
        setDialogData(row);
    };

    const closeDialog = () => {
        setDialogData(null);
    };

    //we should update child object and recalculate total price for item
    const updateLinesAndTotal = (lineNum: number) => (v: InvoiceLine[]) => {        
        const invoiceLinesTotal = v.reduce((acc, line) => acc = acc + line.price * line.quantity, 0);
        updateRecord(lineNum, "invoiceLines")(v);
        updateRecord(lineNum, "total")(invoiceLinesTotal);
    }

    return (
        <>
            <Typography variant="h5" component="h1" style={{ marginTop: "2em" }} gutterBottom>
                Account balance {editedData.reduce((acc, inv) => acc = (inv.group === "expense") ? acc - inv.total : acc + inv.total, 0)}
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="Invoice table">
                    <TableHead>
                        <TableRow>
                            {(Object.keys(headObject) as Array<keyof Invoice>).filter(key => !userHiddenColumns.has(key)).map((key, i) => (
                                <TableCell key={i}>
                                    <Typography noWrap>
                                        <Checkbox
                                            checked={!userHiddenColumns.has(key)}
                                            onChange={handleColumnCheckBoxClick(key)}
                                            inputProps={{ 'aria-label': 'hide column' }}
                                        />
                                        <b>{key}</b>
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editedData.map((row, rowNum) => (
                            <TableRow key={rowNum}>
                                {Object.entries(row).filter(([key]) => !userHiddenColumns.has(key)).map(([key, v], i) =>
                                    <TableCell key={i}>
                                        {key === "title" ?
                                            <Button color="primary" onClick={openDialog({ ...row, index: rowNum })} className={classes.btn}>{v.toString()}</Button>
                                            :
                                            key === "closed" ?
                                                <EditSwitch checked={v} onUpdate={updateRecord(rowNum, key)} />
                                                :
                                                v.toString()
                                        }
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {dialogData && (
                <InvoiceDialog title={dialogData.title} data={dialogData["invoiceLines"]} handleClose={closeDialog} onUpdate={updateLinesAndTotal(dialogData.index)} />
            )}

            <pre>
                <code>
                    {JSON.stringify(
                        editedData,
                        null,
                        2
                    )}
                </code>
            </pre>

        </>
    );
};

export default InvoiceTable;
