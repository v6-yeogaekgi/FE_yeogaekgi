import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import cardImg from '../../../img/Design.png';
import { getCountryImgById } from '../../../util';
import Avatar from '@mui/material/Avatar';

const STYLE = {
    rateBox:{
        width: "150px",
        height: "80px",
        backgroundColor: '#f0f4f8',
        borderRadius: 5,
        margin: "15px",
        display: 'flex', // Flexbox 활성화
        flexDirection: 'column', // 항목을 수직으로 정렬
        justifyContent: 'center', // 수직 가운데 정렬
        alignItems: 'center', // 수평 가운데 정렬
        paddingTop: "2px",
    }
}



const HomaCardRate = () => {
  return (
    <div>
        <Card
            className={"box-title"}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                width: 360, // 가로 크기 360px 설정
                boxShadow: 'none', // 그림자 효과 제거
                borderRadius: 5, // 모서리를 둥글게 설정
            }}
        >

            <Typography
                sx={{
                    backgroundColor:"#2e85e0",
                    color:"#FFFFFF",
                    textAlign: 'center',
                    padding:"5px"
                }}
                >Exchange rate
            </Typography>


            <div style={{
                display:"flex",
                justifyContent:'space-around'
            }}>
                <Box
                    sx={STYLE.rateBox}
                >
                    <Avatar alt="Country Flag" src={getCountryImgById("CN")} />
                    <Typography
                        sx={{
                            textAlign: 'center',
                            padding:"5px"
                        }}
                    >{1} {"CYN"}
                    </Typography>
                </Box>
                <Box
                    sx={STYLE.rateBox}
                >
                    <Avatar alt="Country Flag" src={getCountryImgById("KR")} />
                    <Typography
                        sx={{
                            textAlign: 'center',
                            padding:"5px"
                        }}
                    >{191.10} {"KRW"}
                    </Typography>

                </Box>
            </div>

        </Card>
    </div>
  )
}
export default HomaCardRate;