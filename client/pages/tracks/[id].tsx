import {ITrack} from "@/types/track";
import MainLayout from "@/layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import styles from '../../styles/TrackItem.module.scss'
import {FC, useState} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "@/hooks/useInput";

interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage: FC<TrackPageProps> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const commentText = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/track/comment', {
                username: username.value,
                text: commentText.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
            username.value = ''
            commentText.value = ''
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <MainLayout title={'Spotiguy - '+track.artist+' - '+track.name} keywords={`${track.name}, ${track.artist}, ${track.text}`}>
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={()=>router.push('/tracks')}>
                Back to the list
            </Button>
            <Grid container m={2}>
                <img src={'http://localhost:5000/'+track.picture} alt="track picture" width={200} height={200}/>
                <Box ml={2}>
                    <h1>Name - {track.name}</h1>
                    <h1>Author - {track.artist}</h1>
                    <h1>Plays - {track.listens}</h1>
                </Box>
            </Grid>
            <h1>Track lyrics:</h1>
            <p className={styles.trackText}>{track.text}</p>
            <h2>Comments</h2>
            <Grid container>
                <TextField
                    className={styles.trackCommentField}
                    label="Your name"
                    {...username}
                    fullWidth
                />
                <TextField
                    className={styles.trackCommentField}
                    label="Your comment"
                    {...commentText}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button
                    className={styles.sendCommentBtn}
                    variant={"outlined"}
                    onClick={addComment}
                >
                    Send!
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div key={comment._id} className={styles.trackComment}>
                        <h3>{comment.username}</h3>
                        <p className={styles.commentText}>{comment.text}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/track/'+params?.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}
