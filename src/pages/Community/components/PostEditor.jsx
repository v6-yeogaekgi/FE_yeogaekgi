import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { Stack } from "@mui/system";
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import BasicButton from '../../../components/BasicButton/BasicButton';
import Avatar from '@mui/material/Avatar';
import { getCountryImgById } from '../../../util';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import axios from 'axios';
import { AllStateContext } from '../../../App';
import useAlertDialog from '../../../hooks/useAlertDialog/useAlertDialog';
import PersonIcon from '@mui/icons-material/Person';





const SelectImage = ({fileImgs, setFileImgs}) => {
    // const [fileImgs, setFileImgs] = useState(images);
    const imageInput1 = useRef(null);

    const handleChange = (e) => {
        if(e.target.files.length > 3) {
            // 3장 이상이면 안된다는 내용
        }else{
            let temp = [];
            for(let i = 0; i<e.target.files.length; i++){
                temp.push(e.target.files[i]);
            }
            setFileImgs(temp);
        }

    };

    const onClick = (e, ref) => {
            ref.current?.click();
    }
    const inputStyle = {visibility: 'hidden', position: 'absolute' };
    const imageStyle = { height: '120px', width: '120px', marginLeft:"5px"};
    return (
        <div>
            <div style={{display:'flex'}}>
                {/*실제 input file 요소는 숨김*/}
                <input ref={imageInput1}
                       type="file"
                       onChange={handleChange}
                       multiple
                       style={inputStyle} />
                <AddPhotoAlternateSharpIcon
                    sx={{ color: 'gray', height: '100px', width: '100px' }}
                    onClick={(event) => onClick(event, imageInput1)}
                 >
                </AddPhotoAlternateSharpIcon>
                <div style={{  width: '280px', height:'125px',overflow: 'auto' }}>
                    <div style={{ width: `${125*fileImgs.length}px`, height: '120px', justifyContent: 'space-around',}}>
                        {fileImgs.map((image) => (
                            <img
                                src={typeof image == 'string' ? fileImgs : URL.createObjectURL(image)}
                                alt="미리보기"
                                style={{ height: '120px', width: '120px', marginLeft:"5px"}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const PostEditor = () => {
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const {postId} = useParams();
    const navigate = useNavigate();



    const registerApi  = (data) => {
        return axios
            .post(
                protocol +"community/register",
                data,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data', // 데이터 형식을 명시
                    },
                },
            )
            .then((res) => {
                openAlertDialog("Success!", "Go check out your post.", ()=>navigate('/community/post/'+res.data));
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const modifyApi  = (data) => {
        return axios
            .put(
                protocol +"community/"+postId,
                data,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data', // 데이터 형식을 명시
                    },
                },
            )
            .then((res) => {
                openAlertDialog("Success!", "Go check out your post.", ()=>navigate('/community/post/'+postId));
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const location = useLocation();
    const [fileImgs, setFileImgs] = useState(location.state?.images || []);
    const [hashtag, setHashtag] = useState(location.state?.hashtag || '');
    const [content, setContent] = useState(location.state?.content || '');

    const onClick = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if (!content.trim()) {
            // alert('Please enter the content');
            openAlertDialog('Error', 'Please enter the content');

            return;
        }
        const data = new FormData();
        fileImgs.forEach((file, index) => {
            data.append('multipartFile', file); // 파일 추가
        });
        data.append('hashtag', hashtag);
        data.append('content', content);


        if(location.state?.type === "mod"){
            // modifyApi(data);
        }else{
            registerApi(data);
        }
    }

    return (
        <div className="post-editor" style={{ margin: '10px', height: '600px' }}>
            {/*<div className="profile"*/}
            {/*     style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '10px' }}*/}
            {/*     // member={member.email}*/}
            {/*>*/}
            {/*    <Avatar alt="Remy Sharp"*/}
            {/*            // src={getCountryImgById(member.country == undefined? "" : member.country.code)} sx={{ marginRight: '10px' }}*/}
            {/*    />*/}
            {/*    <Typography>*/}
            {/*        /!*{member.nickname}*!/*/}
            {/*    </Typography>*/}
            {/*</div>*/}
            <br />
            <BasicTextField name="hashtag" label={'Hashtag'} variant={'outlined'} sx={{ width: '100%' }}
                            fullWidth={true}
                            onChange={(e)=>{setHashtag(e.target.value)}}
                            value={hashtag}
                            inputProps={{ maxLength: 20 }}>
            </BasicTextField>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">{hashtag.length} / 20</Typography>
            </div>

            <br />
            <BasicTextField name="content" label={'Content'} variant={'outlined'} sx={{ width: '100%' }}
                            fullWidth={true} rows={5}
                            multiline={true}
                            onChange={(e)=>{setContent(e.target.value)}}
                            value={content}
                            inputProps={{ maxLength: 500 }}
            >
            </BasicTextField>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">{content.length} / 500</Typography>
            </div>
            <br />
            <SelectImage fileImgs={fileImgs} setFileImgs={setFileImgs} />

            <div style={{ width: '100%', textAlign: 'center', marginTop:'10px'}}>
                <BasicButton
                    variant={"contained"}
                    size = {"small"}
                    btnColor={'#4653f9'}
                    text={'Confirm'}
                    variant={'contained'}
                    onClick={onClick}></BasicButton>
            </div>
            <AlertDialog></AlertDialog>


        </div>
    );


}

export default PostEditor;