import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {IAlbum} from "@/types/album";
import TrackItem from "@/components/TrackItem";
import {FC, useState} from "react";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action-creators/track";
import {GetServerSideProps} from "next";
import axios from "axios";
import {ITrack} from "@/types/track";

interface AlbumPageProps {
    serverAlbum: IAlbum
}

const AlbumPage: FC<AlbumPageProps> = ({serverAlbum}) => {
    const router = useRouter();
    const {tracks} = useTypedSelector(state => state.track)
    const [album] = useState(serverAlbum)
    const [albumTracks, setAlbumTracks] = useState(album.tracks)
    const [albumTracksIds, setAlbumTracksIds] = useState(album.tracks.map(track => track._id))
    const [allTracks] = useState(tracks)

    const addTrack = (track: ITrack) => {
        setAlbumTracks(album => [...album, track])
        setAlbumTracksIds(album => [...album, track._id])
        axios.post('http://localhost:5000/album/addTrack/'+serverAlbum._id,{trackId: track._id})
            .then(r  => console.log(r))
    }

    const deleteTrack = (track: ITrack) => {
        setAlbumTracks(albumTracks.filter(tr => tr._id !== track._id))
        setAlbumTracksIds(albumTracksIds.filter(id => id !== track._id))
        axios.post('http://localhost:5000/album/deleteTrack/' + serverAlbum._id, {trackId: track._id})
            .then(r  => console.log(r))
    }

    return (
        <MainLayout title={`Spotiguy - ${album.author} - ${album.name}`}>
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={()=>router.push('/albums')}>
                Back to the list
            </Button>
            <Grid container m={2}>
                <img src={'http://localhost:5000/'+album.picture} alt="album picture" width={200} height={200}/>
                <Box ml={2}>
                    <h1>Name - {album.name}</h1>
                    <h2>Author - {album.author}</h2>
                    <h3>{albumTracks.length} songs</h3>
                </Box>
            </Grid>
            <Card className="card">
                {albumTracks.map(track =>
                    <TrackItem
                        onCLick={()=>deleteTrack(track)}
                        key={track._id}
                        track={track}
                    />
                )}
            </Card>
            <h1>Add track to the album:</h1>
                {allTracks.map(track =>
                    albumTracksIds.includes(track._id)
                        ?
                    <div key={track._id}></div>
                        :
                    <TrackItem
                        track={track}
                        key={track._id}
                        onCLick={()=>addTrack(track)}
                    />
                )}
        </MainLayout>
    );
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            const response = await axios.get('http://localhost:5000/album/'+params?.id)
            const dispatch = store.dispatch as NextThunkDispatch
            await dispatch(await fetchTracks())
            return {
                props: {
                    serverAlbum: response.data
                }
            };
        }
);

