import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

interface Prop {
    onClick:() => void;
}

export default function DeleteButton(props: Prop) {
    return (
        <Stack direction="row" spacing={2}
               sx={{display: "flex",
                   justifyContent: "center",
                   padding: "3px 0",
                   background: "rgb(255,255,255, .8)",
               }}>
            <Button color="error" startIcon={<DeleteIcon />} sx={{width: "100%"}} onClick={props.onClick}>
                Delete
            </Button>
        </Stack>
    );
}
