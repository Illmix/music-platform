import {FC, MouseEvent, useEffect, useState} from "react";
import {ITrack} from "@/types/track";
import {Card, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import ModalItem from "@/components/ModalItem";
interface TrackItemProps {
    track: ITrack;
    onCLick: () => void;
}

const TrackItem: FC<TrackItemProps> = ({track, onCLick}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const {pause, active} = useTypedSelector(state => state.player)
    const [currPause, setCurrPause] = useState(pause)
    const {setActiveTrack, playTrack, pauseTrack} = useActions()

    useEffect(() => {
        if (pause && active?._id === track._id) {
            setCurrPause(true)
        }
        else if (!pause && active?._id === track._id) {
            setCurrPause(false)
        }
    }, [pause]);

    const play = async (e: any) => {
        e.stopPropagation()
        if (active?._id !== track._id) {
            await pauseTrack()
            setActiveTrack(track)
        } else {
            if (pause) {
                await playTrack()
            } else {
                await pauseTrack()
            }
        }
    }

    const deleteTrack = ((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpen(true);
    });

    return (
        <>
            <Card className='card-item' onClick={onCLick}>
                <IconButton onClick={play}>
                    {!currPause
                        ?
                        <Pause/>
                        :
                        <PlayArrow/>
                    }
                </IconButton>
                <img width={80} height={80} src={'http://localhost:5000/'+track.picture} alt={`${track.artist}-${track.name}`}/>
                <Grid container direction="column" className='card-details'>
                    <div className='card-item-name'>
                    <span className="text-button" onClick={() => router.push('/tracks/'+track._id)}>
                        {track.name}
                    </span>
                    </div>
                    <div className='card-item-detail'>{track.artist}</div>
                </Grid>
                <IconButton className='deleteBtn' onClick={deleteTrack}>
                    <Delete/>
                </IconButton>
            </Card>
            <ModalItem open={open} handleClose={()=>setOpen(false)} url={"http://localhost:5000/track/"+track._id}>
                Are you sure you want to delete this track?
            </ModalItem>
        </>

    );
};

export default TrackItem;