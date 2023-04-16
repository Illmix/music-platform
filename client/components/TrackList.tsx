import {FC} from "react";
import {ITrack} from "@/types/track";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import TrackItem from "@/components/TrackItem";
import {useRouter} from "next/router";

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: FC<TrackListProps> = ({tracks}) => {
    const router = useRouter();
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        onCLick={()=>router.push('/tracks/'+track._id)}
                        key={track._id}
                        track={track}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default TrackList;