import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import BasicButton from '../../../components/BasicButton/BasicButton';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function PostNav({ handleSearch, search }) {
    const navigate = useNavigate();

    const onClickMy = () => {
        handleSearch({
            content: '',
            hashtag: '',
            myPost: true,
            page: 0,
        });
        // navigate('/community', { state: { myPost: true } });
    };
    // 키보드 입력 처리
    const handleChange = (event) => {
        const keyword = event.target.value.trim();
        if (keyword.length > 1 && keyword[0] === '#') {
            handleSearch({
                content: '',
                hashtag: keyword.substr(1),
                myPost: false,
                page: 0,
            });
            // navigate('/community', { state: { hashtag: keyword.substr(1) } });
        } else {
            handleSearch({
                content: keyword,
                hashtag: '',
                myPost: false,
                page: 0,
            });
            // navigate('/community', { state: { content: keyword } });
        }
    };

    return (
        <Card
            sx={{
                padding: '10px',
                boxShadow: 'none',
                borderRadius: 5,
                backgroundColor: '#ffffff',
                mb: 2,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BasicTextField
                    sx={{
                        width: '100%',
                        padding: '10px',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={search.hashtag ? `#${search.hashtag}` : undefined}
                    variant={'standard'}
                    onChange={handleChange}
                    // onKeyDown={searchKeyword}
                    placeholder={'Enter search keywords'}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <BasicButton
                    className={'new-btn'}
                    variant={'contained'}
                    startIcon={<NoteAddIcon />}
                    size={'small'}
                    text={'New Post'}
                    width={'45%'}
                    onClick={() => {
                        navigate('/community/regist'); // 네비게이션할 경로
                    }}
                    btnColor={'#4653f9'}
                />
                <BasicButton
                    className={'my-btn'}
                    variant={'contained'}
                    onClick={onClickMy}
                    startIcon={<PersonIcon />}
                    size={'small'}
                    text={'My Post'}
                    width={'45%'}
                    btnColor={'#4653f9'}
                />
            </div>
        </Card>
    );
}
