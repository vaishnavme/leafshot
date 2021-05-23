import { v4 } from "uuid";
// adding to playlist
const addToPlayList = (state, playListID, videoContent) => ({
  ...state,
  playList: state.playList.map((playListItem) => {
    return playListItem.id === playListID ?
      {
        ...playListItem,
        videos: [...playListItem.videos, videoContent]
      } 
      : playListItem
  })
})

// Removing video from playlist
const removeFromPlayList = (state, playListID, videoContent) => ({
  ...state,
  playList: state.playList.map((playListItem) => {
    return playListItem.id === playListID ?
      {
        ...playListItem,
        videos: playListItem.videos.filter(
          (videoItem) => videoItem._id !== videoContent._id
        )
      }
      : playListItem
  })
})

export const dataReducer = (state, {type, payload}) => {
    console.log("State: ", state)
    console.log("Type: ", type)
    console.log("Payload: ", payload)
    switch(type) {
        case "SET_DATA":
            return {...state, allVideos: payload || []}
        
        case "SET_LIKED":
            return {...state, likedVideos: payload || []}
        
        case "SET_WATCHLATER":
            return {...state, watchlater: payload || []}

        case "TOGGLE_IN_PLAYLIST": 
            const getPlayList = state.playList.find(
              (playListItem) => playListItem.id === payload.playListID
            )
            
            const isInPlayList = getPlayList.videos.find(
              (video) => video._id === payload.videoInfo._id
            )
            return isInPlayList ?
                    removeFromPlayList(state, payload.playListID, payload.videoInfo)
                  : addToPlayList(state, payload.playListID, payload.videoInfo)
            
        case "NEW_PLAYLIST":
            return {
              ...state,
              playList: [
                ...state.playList,
                {
                  id: v4(),
                  name: payload.newPlaylist,
                  videos: [payload.videoInfo]
                }
              ]
            }

        default:
            return state
    }
}