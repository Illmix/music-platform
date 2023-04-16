import MainLayout from "@/layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import AlbumList from "@/components/AlbumList";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "@/store";
import {fetchAlbums} from "@/store/action-creators/album";
const Index = () => {
    const router = useRouter()
    const {albums} = useTypedSelector(state => state.album)
    return (
        <MainLayout title={"Albums - Spotiguy"}>
            <Grid container justifyContent='center'>
                <Card className="card">
                    <Box p={2}>
                        <Grid container justifyContent='space-between'>
                            <h1>
                                Album list
                            </h1>
                            <Button onClick={()=>router.push('/albums/create')}>
                                Create album
                            </Button>
                        </Grid>
                    </Box>
                    <AlbumList albums={albums}/>
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
            await dispatch(await fetchAlbums())
            return {
                props: {},
            };
        }
);
