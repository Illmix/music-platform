import IconButton from "@mui/material/IconButton";
import {Pause, PlayArrow} from "@mui/icons-material";
import styles from '../styles/Player.module.scss'
import {Grid} from "@mui/material";
import {useRouter} from "next/router";
import TrackProgress from "@/components/TrackProgress";
import VolumeRegulation from "@/components/VolumeRegulation";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useActions} from "@/hooks/useActions";
import React, {useEffect, useState} from "react";
import axios from "axios";

let audio: any;

const Player = () => {
    const router = useRouter();
    const {active, volume, duration, currentTime, pause} = useTypedSelector(state => state.player)
    const [played, setPlayed] = useState(false)
    const {playTrack, pauseTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()

    useEffect(() => {
        if(!audio) {
            audio = new Audio()
        }
        else if (active && JSON.stringify(active) !== localStorage.getItem('reloadActive')) {
            localStorage.setItem('reloadActive', JSON.stringify(active))
            setAudio()
        }
        if (!active) {
            setAudio()
        }
    }, [active]);

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/'+active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
            playTrack()
            audio.play()
        }
        else if (!active && localStorage.getItem('reloadActive')) {
            // @ts-ignore
            const reloadActive = JSON.parse(localStorage.getItem('reloadActive'))
            audio.src = 'http://localhost:5000/'+reloadActive.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
            audio.currentTime = Number(localStorage.getItem('currentTime')) || 0
            setActiveTrack(reloadActive)
        }
    }

    useEffect(() => {
        if (pause) {
            audio.pause()
        }
        else {
            audio.play()
        }
    }, [pause]);

    const handlePlay = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value)/100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Math.ceil(Number(e.target.value)))
    }

    useEffect(() => {
        if (currentTime) {
            localStorage.setItem('currentTime', JSON.stringify(currentTime))
            if (duration === currentTime && !played) {
                setPlayed(true)
                axios.get('http://localhost:5000/track/listen/' + active?._id).then()
            }
        }
    }, [currentTime]);

    if (!active) {
        return null
    }


    return (
        <div className={styles.player}>
            <IconButton onClick={handlePlay}>
                {!pause
                    ?
                    <Pause/>
                    :
                    <PlayArrow/>
                }
            </IconButton>
            <Grid container direction="column" className='card-details'>
                <div className='card-item-name'>
                    <span className="text-button" onClick={() => router.push('/tracks/'+active?._id)}>
                        {active?.name}
                    </span>
                </div>
                <div className='card-item-detail'>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeRegulation left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;