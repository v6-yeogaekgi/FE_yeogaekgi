import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Box from '@mui/material/Box';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // 음악 재생 중 아이콘 추가

const MusicPlayer = () => {
    const songs = [
        process.env.REACT_APP_SONG1_URL,
        process.env.REACT_APP_SONG2_URL,
        process.env.REACT_APP_SONG3_URL,
        process.env.REACT_APP_SONG4_URL,
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            setPlaying(true);
        }
    }, [isLoaded]);

    useEffect(() => {
        setIsLoaded(false);
    }, [currentSongIndex]);

    const togglePlay = () => {
        setPlaying(!playing);
    };

    const handleNext = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setPlaying(true);
    };

    const handlePrevious = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === 0 ? songs.length - 1 : prevIndex - 1,
        );
        setPlaying(true);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <ReactHowler
                src={songs[currentSongIndex]}
                playing={playing}
                onEnd={handleNext}
                onLoad={() => {
                    setIsLoaded(true);
                    setPlaying(true);
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                {!playing ? (
                    <IconButton onClick={togglePlay}>
                        <PlayArrowIcon />
                    </IconButton>
                ) : (
                    <>
                        <IconButton onClick={handlePrevious}>
                            <SkipPreviousIcon />
                        </IconButton>
                        <IconButton onClick={togglePlay}>
                            <PauseIcon />
                        </IconButton>
                        <IconButton onClick={handleNext}>
                            <SkipNextIcon />
                        </IconButton>
                    </>
                )}
                {playing && (
                    <IconButton
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            zIndex: 1000,
                        }}
                        onClick={() => setPlaying(false)} // 클릭 시 음악 정지
                    >
                        <MusicNoteIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default MusicPlayer;
