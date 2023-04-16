import {AlbumAction, AlbumActionTypes} from "@/types/album";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/album')
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data
            })
        } catch (e: any) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR, payload: e.message
            })
        }

    }
}