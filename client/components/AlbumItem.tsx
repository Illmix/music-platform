import {FC, MouseEvent, useState} from "react";
import {IAlbum} from "@/types/album";
import {Card, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useRouter} from "next/router";
import ModalItem from "@/components/ModalItem";

interface AlbumItemProps {
    album: IAlbum;
}

const AlbumItem: FC<AlbumItemProps> = ({album}) => {
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const deleteAlbum = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setOpen(true)
    }

    return (
        <>
            <Card className='card-item' onClick={()=>router.push('/albums/'+album._id)}>
                <img width={80} height={80} src={'http://localhost:5000/'+album.picture} alt={`${album.author}-${album.name}`}/>
                <Grid container direction="column" className='card-details'>
                    <div className='card-item-name'>{album.name}</div>
                    <div className='card-item-detail'>By {album.author}</div>
                </Grid>
                <IconButton className='deleteBtn' onClick={deleteAlbum}>
                    <Delete/>
                </IconButton>
            </Card>
            <ModalItem open={open} handleClose={()=>setOpen(false)} url={"http://localhost:5000/album/"+album._id}>
                Are you sure you want to delete this album?
            </ModalItem>
        </>
    );
};

export default AlbumItem;