import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { maxPropsLenght } from "../utils";
import { Invoice, InvoiceLine } from "../types/Invoice";
import EditText from "./EditText";

import useRecord from "../utils/useRecord";

const InvoiceDialog: React.FC<{
    title: Invoice["title"];
    data: InvoiceLine[];
    onUpdate: (value: InvoiceLine[]) => void;
    handleClose: () => void
}> = ({ title, data, handleClose, onUpdate }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const headObject = maxPropsLenght(data);

    const [editedData, updateRecord] = useRecord(data);

    const updateNumeric = (lineNum: number, key: keyof InvoiceLine) => (v: string) => {
        updateRecord(lineNum, key)(Number(v));
    }

    const save = () => {
        onUpdate(editedData);
        handleClose();
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClose={handleClose}
            aria-labelledby={title}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {(Object.keys(headObject) as Array<keyof InvoiceLine>).map((key, i) => (
                                    <TableCell key={i}><b>{key}</b></TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {editedData.map((lines, lineNum) =>
                                <TableRow key={lineNum}>
                                    {Object.entries(lines).map(([key, v], i) => (
                                        <TableCell key={i}>
                                            {(key === "price" || key === "quantity") ? <EditText text={v} onUpdate={updateNumeric(lineNum, key)} type="number"/> : v}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" autoFocus disableElevation onClick={handleClose}>Close</Button>
                <Button variant="contained" color="primary" autoFocus disableElevation onClick={save}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvoiceDialog;
