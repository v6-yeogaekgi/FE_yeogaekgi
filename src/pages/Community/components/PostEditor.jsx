import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { Stack } from "@mui/system";
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import BasicButton from '../../../components/BasicButton/BasicButton';
import Avatar from '@mui/material/Avatar';
import { getCountryImgById } from '../../../util';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import axios from 'axios';
import { AllStateContext } from '../../../App';
import PersonIcon from '@mui/icons-material/Person';





const SelectImage = ({existingImgs, handleDeleteImg, setNewImgs, newImgs}) => {
    const imageInputButton = useRef(null);
    const onClick = (e, ref) => {
        ref.current?.click();
    }
    const handleAdd = (e) => {
        if(e.target.files.length +  newImgs.length + existingImgs.length > 3) {
            // 사진은 최대 3개까지만 가능하다는 내용
        }else{
            setNewImgs([...newImgs, ...e.target.files])
            console.log(newImgs);
        }
    };
    const handleCancel = (indexToRemove) => {
        setNewImgs([...newImgs.slice(0, indexToRemove), ...newImgs.slice(indexToRemove + 1)])
    }


    const cancelBtnStyle = {
        position: 'absolute',
        top: '5px', // 조정할 위치
        right: '5px', // 조정할 위치
        backgroundColor: 'white', // 배경색 (투명도 조절)
        borderRadius: '50%', // 둥근 버튼
        padding: '1px',
    };

    return (
        <div>
            <div style={{display:'flex'}}>
                {/*image 추가 버튼*/}
                <input ref={imageInputButton}
                       type="file"
                       onChange={handleAdd}
                       multiple
                       style={{
                           visibility: 'hidden',
                           position: 'absolute'
                       }}
                />
                <AddPhotoAlternateSharpIcon
                    sx={{ color: 'gray', height: '100px', width: '100px' }}
                    onClick={(event) => onClick(event, imageInputButton)}
                >
                </AddPhotoAlternateSharpIcon>

                {/*image 미리보기*/}
                <div style={{  width: '280px', height:'125px',overflow: 'auto' }}>
                    <div style={{ width: `${125*(existingImgs.length + newImgs.length)}px`, height: '120px', justifyContent: 'space-around',}}>
                        {existingImgs.map((image, index) => (
                            <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px' }}>
                                <img
                                    src={image}
                                    alt={`img-${index}`}
                                    style={{ height: '120px', width: '120px' }}
                                />
                                <CancelSharpIcon
                                    onClick={() => handleDeleteImg(index)}
                                    style={cancelBtnStyle}
                                >
                                </CancelSharpIcon>
                            </div>
                    //     ))}
                    //         <img
                    //         idx={index}
                    //     src={image}
                    //     alt="img"
                    //     style={{ height: '120px', width: '120px', marginLeft: '5px' }}
                    // />
                    ))}
                    {newImgs.map((image, index) => (
                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px' }}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="img"
                                style={{ height: '120px', width: '120px'}}
                            />
                            <CancelSharpIcon
                                onClick={() => handleCancel(index)}
                                style={cancelBtnStyle}
                            >
                            </CancelSharpIcon>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};


const PostEditor = () => {
    const { protocol, dialog } = useContext(AllStateContext);
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
                dialog.alert.openAlertDialog(
                    "Success!",
                    "Go check out your post.",
                    ()=>navigate('/community/post/'+res.data));
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
                dialog.alert.openAlertDialog(
                    "Success!",
                    "Go check out your post.",
                    ()=>navigate('/community/post/'+postId));
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const location = useLocation();
    const [newImgs, setNewImgs] = useState([]);
    const [existingImgs, setExistingImgs] = useState(location.state?.images || []);
    const [deleteImgs, setDeleteImgs] = useState([])
    const [fileImgs, setFileImgs] = useState(location.state?.images || []);
    const [hashtag, setHashtag] = useState(location.state?.hashtag || '');
    const [content, setContent] = useState(location.state?.content || '');

    const handleDeleteImg = (indexToRemove) => {
        setDeleteImgs([...deleteImgs, existingImgs[indexToRemove]]);
        setExistingImgs([...existingImgs.slice(0, indexToRemove), ...existingImgs.slice(indexToRemove + 1)])
    }

    const onClick = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if (!content.trim()) {
            // alert('Please enter the content');
            dialog.alert.openAlertDialog(
                'Error',
                'Please enter the content'
            );
            return;
        }
        const formData = new FormData();
        newImgs.forEach((file) => {
            formData.append('multipartFile', file); // 파일 추가
        });
        formData.append('deleteImages', deleteImgs);
        formData.append('existingImages', existingImgs);
        formData.append('hashtag', hashtag);
        formData.append('content', content);


        if(location.state?.type === "mod"){
            modifyApi(formData);
        }else{
            registerApi(formData);
        }
    }

    return (
        <div className="post-editor" style={{ margin: '10px', height: '600px' }}>

            <br />
            <BasicTextField name="hashtag" label={'Hashtag'} variant={'outlined'} sx={{ width: '100%' }}
                            fullWidth={true}
                            onChange={(e)=>{setHashtag(e.target.value)}}
                            defaultValue={hashtag}
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
                            defaultValue={content}
                            inputProps={{ maxLength: 500 }}
            >
            </BasicTextField>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">{content.length} / 500</Typography>
            </div>
            <br />
            <SelectImage existingImgs={existingImgs} handleDeleteImg={handleDeleteImg} setNewImgs={setNewImgs} newImgs={newImgs}/>

            <div style={{ width: '100%', textAlign: 'center', marginTop:'10px'}}>
                <BasicButton
                    variant={"contained"}
                    size = {"small"}
                    width = {"100%"}
                    text={'Confirm'}
                    variant={'contained'}
                    onClick={onClick}></BasicButton>
            </div>
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>


        </div>
    );


}

export default PostEditor;