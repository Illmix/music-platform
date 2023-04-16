import MainLayout from "@/layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import TrackList from "@/components/TrackList";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks, searchTracks} from "@/store/action-creators/track";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>();
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            // @ts-ignore
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    return (
        <MainLayout title={"Library - Spotiguy"}>
           <Grid container justifyContent='center'>
               <Card className="card">
                   <Box p={2}>
                       <Grid container justifyContent='space-between'>
                           <h1>
                               Track list
                           </h1>
                           <Button onClick={()=>router.push('/tracks/create')}>
                               Upload track
                           </Button>
                       </Grid>
                   </Box>
                   <TextField
                       fullWidth
                       value={query}
                       onChange={search}
                       />
                   {error
                       ?
                   <h1>{error}</h1>
                       :
                   <TrackList tracks={tracks}/>
                   }
               </Card>
           </Grid>
        </MainLayout>
    );
};

export default Index;


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