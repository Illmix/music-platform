import React, {FC} from "react";
import Box from "@mui/material/Box";
import {Button, Modal} from "@mui/material";
import axios from "axios";

interface ModalProps {
    open: boolean,
    handleClose: () => void,
    children: React.ReactNode,
    url: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ModalItem: FC<ModalProps> = ({open, handleClose, children, url}) => {

    const handleYes = async () => {
        await axios.delete(url)
        handleClose()
        window.location.reload();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2>
                    {children}
                </h2>
                <Box display="flex" justifyContent="space-around">
                    <Button variant="outlined" type="submit" color="error" onClick={handleYes}>
                        Yes
                    </Button>
                    <Button variant="outlined" type="reset" color="success" onClick={handleClose}>
                        No
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalItem;