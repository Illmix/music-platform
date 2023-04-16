import {TrackAction, TrackActionTypes} from "@/types/track";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/track')
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS, payload: response.data
            })
        } catch (e: any) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: e.message
            })
        }

    }
}

export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/track/search?query='+query)
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS, payload: response.data
            })
        } catch (e: any) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: e.message
            })
        }

    }
}