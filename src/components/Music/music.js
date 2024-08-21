import React, { useState } from 'react';
import ReactHowler from 'react-howler';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const MusicPlayer = () => {
    const songs = [
        process.env.REACT_APP_SONG1_URL,
        process.env.REACT_APP_SONG2_URL,
        process.env.REACT_APP_SONG3_URL,
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

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
        <div>
            <ReactHowler
                src={songs[currentSongIndex]}
                playing={playing}
                onEnd={handleNext}
            />
            <div>
                <IconButton onClick={handlePrevious}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton onClick={togglePlay}>
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={handleNext}>
                    <SkipNextIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default MusicPlayer;
