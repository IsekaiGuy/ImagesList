import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IIdSelector {
    ids: number[],
    setCurrentAlbumId: (e: number) => void,
    currentAlbumId: number,
}

export default function IdSelector({ids, setCurrentAlbumId, currentAlbumId}: IIdSelector) {
    const [album, setAlbum] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setAlbum(event.target.value as string);
        setCurrentAlbumId(+event.target.value);
    };

    return (
        <Box sx={{ width: 150, margin: "30px auto 0 auto" }} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{`AlbumId:${currentAlbumId}`}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={album}
                    label="Age"
                    onChange={handleChange}
                >
                    {ids.map((id:number, index:number) => {
                        return <MenuItem value={id} key={index}>{`AlbumId: ${id}`}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}