import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import AlbumItem from "@/components/AlbumItem";
import {FC} from "react";
import {IAlbum} from "@/types/album";

interface AlbumListProps {
    albums: IAlbum[]
}

const AlbumList: FC<AlbumListProps> = ({albums}) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {albums.map(album =>
                    <AlbumItem
                        key={album._id}
                        album={album}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default AlbumList;