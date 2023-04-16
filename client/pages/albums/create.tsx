import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import styles from "@/styles/tracks.create.module.scss";
import FileUpload from "@/components/FileUpload";
import {useState} from "react";
import TrackItem from "@/components/TrackItem";
import {ITrack} from "@/types/track";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action-creators/track";
import {useInput} from "@/hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const name = useInput('');
    const author = useInput('');
    const {tracks} = useTypedSelector(state => state.track)
    const [albumTracks, setTracks] = useState<ITrack[]>([]);
    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData();
            formData.append('name', name.value)
            formData.append('author', author.value)
            formData.append('picture', picture ? picture : '')
            for (let j = 0; j < albumTracks.length; j++) {
                formData.append('tracks', albumTracks[j]._id)
            }
            axios.post('http://localhost:5000/album', formData)
                .then(r => router.push('/albums'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1)
        } else {
            router.push('/albums')
        }
    }

    return (
        <MainLayout>
            <StepWrapper steps={['Album information', 'Upload album cover', 'Add tracks']} activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} className={styles.stepGrid}>
                        <TextField
                            {...name}
                            className={styles.textField}
                            label={"Album name"}
                        />
                        <TextField
                            {...author}
                            className={styles.textField}
                            label={"Author name"}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <Grid container justifyContent="center">
                        {!picture
                            ?
                            <FileUpload setFile={setPicture} accept={'image/*'}>
                                <Button>Upload image</Button>
                            </FileUpload>
                            :
                            <div>
                                <h3>Image uploaded</h3>
                                <FileUpload setFile={setPicture} accept={'image/*'}>
                                    <Button>Change image</Button>
                                </FileUpload>
                            </div>
                        }
                    </Grid>
                }
                {activeStep === 2 &&
                    <Grid>
                        <Grid m={1}>
                            <h3>Tracks in album:</h3>
                            {albumTracks.map(track =>
                                <TrackItem key={track._id} track={track} onCLick={()=>setTracks([...albumTracks.filter(t => track !== t)])}/>
                            )}
                        </Grid>
                        <Grid m={1}>
                            <h3>All tracks:</h3>
                            {tracks.map(track =>
                                albumTracks.includes(track) ? <div key={track._id}></div> : <TrackItem key={track._id} track={track} onCLick={()=>setTracks([...albumTracks, track])}/>
                            )}
                        </Grid>
                    </Grid>
                }
            </StepWrapper>
            <Grid container justifyContent="space-between">
                <Button onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req }) => {
            const dispatch = store.dispatch as NextThunkDispatch
            await dispatch(await fetchTracks())
            return {
                props: {},
            };
        }
);

