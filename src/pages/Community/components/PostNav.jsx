import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTextField from '../../../components/BasicTextField/BasicTextField'
import BasicButton from '../../../components/BasicButton/BasicButton'
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import axios from 'axios';




export default function PostNav({handleSearch}) {


    const navigate = useNavigate();
    const onClickMy=(event) =>{
        handleSearch({'myPost':true});
    };

    // 해시태그/내용 검색어 입력
    const serachKeyword = (event) =>{
        if(event.key == 'Enter'){
            const keyword = event.target.value;
            if(keyword.length > 1 && keyword[0] == '#'){
                handleSearch({'hashtag':keyword.substr(1)});
            }else{
                handleSearch({'content':keyword});
            }
        }
    };


    return (
        <Box sx={{padding:"10px", backgroundColor:"#F0F0F0"}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BasicTextField
                    sx={{
                        width:"100%",
                        padding: "10px",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant={"standard"} onKeyDown={serachKeyword} placeholder={"Enter search keywords"}></BasicTextField>
                {/*<SearchIcon sx={{color:"gray"}}></SearchIcon>*/}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
                <BasicButton className={"new-btn"}
                             variant={"contained"}
                             startIcon={<NoteAddIcon/>}
                             size = {"small"}
                             text={"New Post"}
                             width={"45%"}
                             onClick={() => {
                                 navigate('/community/regist'); // 네비게이션할 경로
                             }}
                             btnColor={'#4653f9'}
                ></BasicButton>

                <BasicButton className={"my-btn"}
                             variant={"contained"}
                             onClick={onClickMy}
                             startIcon={<PersonIcon/>}
                             size = {"small"}
                             text={"My Post"}
                             width={"45%"}
                             btnColor={'#4653f9'}
                ></BasicButton>
            </div>

        </Box>
    );
}