import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import BasicButton from "../../components/BasicButton/BasicButton";

const useAlertDialog = () => {
    const [open, setOpen] = React.useState(false);

    const openAlertDialog = () => setOpen(true);
    const closeAlertDialog = () => setOpen(false);

    const AlertDialog = ({title, content}) => {
        return (
            <Dialog
                open={open}
                onClose={closeAlertDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style : {width : '380px'}
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <BasicButton text={'close'} width={170} onClick={closeAlertDialog}></BasicButton>
                </DialogActions>
            </Dialog>
        );
    };

    return { openAlertDialog, AlertDialog };
};

export default useAlertDialog;