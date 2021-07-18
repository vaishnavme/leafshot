import axios from "axios"
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const createPlaylist = async({playlistName, video, dispatch}) => {
    try {
        const {data: {success, playlist}} = await axios.post(`/playlist/create/${video._id}`, {
            playlistName
        });
        if(success) {
            successNotification("New Playlist Created");
            dispatch({type: "CREATE_PLAYLIST", payload: playlist})
        }
    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
} 

export const removeFromPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId, videoId}} = await axios.delete(`/playlist/${playListId}/${video._id}`);
        dispatch({type: "REMOVE_FROM_PLAYLIST", payload: {playlistId, videoId}})
        successRemoveNotification("Removed from playlist")

    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
}

export const addToPlaylist = async({playListId, video, dispatch}) => {
    try {
        const {data: {playlistId}} = await axios.post(`/playlist/${playListId}/${video._id}`);
        dispatch({type: "ADD_TO_PLAYLIST", payload: {playlistId, video}})
        successNotification("Added to Playlist")
    } catch(err) {
        errorNotification("Error Occured!")
        console.log("error", err)
    }
}