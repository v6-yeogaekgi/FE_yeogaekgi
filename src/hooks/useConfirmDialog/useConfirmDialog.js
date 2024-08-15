import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import BasicButton from "../../components/BasicButton/BasicButton";

const useConfirmDialog = () => {
    const [open, setOpen] = React.useState(false);

    const openConfirmDialog = () => setOpen(true);
    const closeConfirmDialog = () => setOpen(false);

    const ConfirmDialog = ({title, content, onAgree}) => {
        const handleAgree = () => {
            if (onAgree) {
                onAgree();
            }
            closeConfirmDialog();
        };

        return (
            <Dialog
                open={open}
                onClose={closeConfirmDialog}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                PaperProps={{
                    style : {width : '380px'}
                }}
            >
                <DialogTitle id="confirm-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <BasicButton text={'close'} width={170} onClick={closeConfirmDialog}></BasicButton>
                    <BasicButton text={'Agree'} width={170} onClick={handleAgree} autoFocus></BasicButton>
                </DialogActions>
            </Dialog>
        );
    };

    return { openConfirmDialog, ConfirmDialog };
};

export default useConfirmDialog;