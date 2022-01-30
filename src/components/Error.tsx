import * as React from 'react';
import Box from '@mui/material/Box';

import ErrorGif from "../images/404.gif";

export default function Error() {
    return (
        <Box sx={{ display: 'flex', width: "100%", justifyContent:"center", pt: 20 }}>
            <img src={ErrorGif} alt="Error"/>
        </Box>
    );
}