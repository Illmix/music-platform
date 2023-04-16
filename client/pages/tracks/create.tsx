import MainLayout from "@/layouts/MainLayout";
import StepWrapper from "@/components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import styles from '../../styles/tracks.create.module.scss'
import FileUpload from "@/components/FileUpload";
import {useInput} from "@/hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const router = useRouter()
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture ? picture : '')
            formData.append('audio', audio ? audio : '')
            axios.post('http://localhost:5000/track', formData)
                .then(r => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1)
        } else {
            router.push('/tracks')
        }
    }

    return (
        <MainLayout>
            <StepWrapper steps={['Track information', 'Upload track cover', 'Upload track']} activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} className={styles.stepGrid}>
                        <TextField
                            required
                            {...name}
                            className={styles.textField}
                            label={"Track name"}
                        />
                        <TextField
                            required
                            {...artist}
                            className={styles.textField}
                            label={"Artist name"}
                        />
                        <TextField
                            required
                            {...text}
                            className={styles.textField}
                            label={"Track lyrics"}
                            multiline
                            rows={3}
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
                    <Grid container justifyContent="center">
                        {!audio
                            ?
                        <FileUpload setFile={setAudio} accept={'audio/*'}>
                            <Button>Upload audio</Button>
                        </FileUpload>
                            :
                            <div>
                                <h3>Audio uploaded</h3>
                                <FileUpload setFile={setAudio} accept={'audio/*'}>
                                    <Button>Change audio</Button>
                                </FileUpload>
                            </div>
                        }
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