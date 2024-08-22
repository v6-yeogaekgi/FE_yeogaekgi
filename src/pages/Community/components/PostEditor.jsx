import React, {useState, useRef} from "react";
import { Stack } from "@mui/system";
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import BasicButton from '../../../components/BasicButton/BasicButton';
import Avatar from '@mui/material/Avatar';
import { getCountryImgById } from '../../../util';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';





const SelectImage = ({images=[]}) => {
    const [fileImgs, setFileImgs] = useState(images);

    const imageInput1 = useRef(null);

    const handleChange = (e) => {
        console.log(e.target.files);
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
            console.log(e);
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


const PostEditor = ({
                        type = 'register', // register | modify
                        post={imges:[], hashtag:"", content:""},
                        member,
                    }) => {

    const onClick = () => {

    }
    return (
        <div className="post-editor" style={{ margin: '10px', height: '600px' }}>
            <div className="profile"
                 style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '10px' }}
                 member={member.memberId}>
                <Avatar alt="Remy Sharp" src={getCountryImgById(member.countryId)} sx={{ marginRight: '10px' }} />
                <Typography>{member.nickname}</Typography>
            </div>
            <br />
            <BasicTextField name="hashtag" label={'Hashtag'} variant={'outlined'} sx={{ width: '100%' }}
                            fullWidth={true}>
            </BasicTextField>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">{'글자수'} / 20</Typography>
            </div>

            <br />
            <BasicTextField name="content" label={'Content'} variant={'outlined'} sx={{ width: '100%' }}
                            fullWidth={true} rows={5}
                            multiline={true}>
            </BasicTextField>
            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">{'글자수'} / 500</Typography>
            </div>
            <br />
            <SelectImage images={post.images} />
            <br /><br />
            <div style={{ width: '100%', textAlign: 'center' }}>
                <BasicButton text={'Confirm'} variant={'contained'} onClick={onClick}></BasicButton>
            </div>


        </div>
    );


}

export default PostEditor;