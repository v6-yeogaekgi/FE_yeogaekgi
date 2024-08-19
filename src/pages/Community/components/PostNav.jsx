import * as React from 'react';
import BasicTextField from '../../../components/BasicTextField/BasicTextField'
import BasicButton from '../../../components/BasicButton/BasicButton'
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';




export default function PlaygroundSpeedDial() {
    const [direction, setDirection] = React.useState('up');
    const [hidden, setHidden] = React.useState(false);
    const onClickNew=(event) =>{
        //onClickNew event
    };
    const onClickMy=(event) =>{
        //onClickMy event
    };
    const onChange=(event) =>{
        //onChange event
    };
    return (
        <Box sx={{margin:"3px 10px"}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BasicTextField
                    sx={{
                        width:"320px",
                        padding: "10px",
                    }}
                    variant={"standard"} onChange={onChange} placeholder={"Enter search keywords"}></BasicTextField>
                <SearchIcon sx={{color:"gray"}}></SearchIcon>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                <BasicButton className={"new-btn"}
                             variant={"contained"}
                             onClick={onClickNew}
                             startIcon={<NoteAddIcon/>}
                             size = {"small"}
                             text={"New Post"}
                             width={"45%"}
                ></BasicButton>

                <BasicButton className={"my-btn"}
                             variant={"contained"}
                             onClick={onClickMy}
                             startIcon={<PersonIcon/>}
                             size = {"small"}
                             text={"My Post"}
                             width={"45%"}
                ></BasicButton>
            </div>

        </Box>
    );
}