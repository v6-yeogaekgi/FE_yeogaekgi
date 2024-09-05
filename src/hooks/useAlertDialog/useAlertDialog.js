import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import BasicButton from "../../components/BasicButton/BasicButton";

const useAlertDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [alertDialog, setAlertDialog] =  React.useState({
        open: false,
        title: '',
        content: '',
    });
    const openAlertDialog = (title="Title", content="Content", onClose = () => {}) => setAlertDialog({
        open: true,
        title: title,
        content: content,
        onClose:onClose
    });
    const closeAlertDialog = () => {
        setAlertDialog(
            {
                ...alertDialog,
                open: false,
            });
        alertDialog.onClose();
    }

    const AlertDialog = ({title, content}) => {
        return (
            <Dialog
                open={alertDialog.open}
                onClose={closeAlertDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style : {
                        width : '380px',
                        borderRadius: '15px',
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {title? title : alertDialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content? content : alertDialog.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <BasicButton text={'close'} width={150} onClick={closeAlertDialog}></BasicButton>
                </DialogActions>
            </Dialog>
        );
    };

    return { openAlertDialog, AlertDialog };
};

export default useAlertDialog;