import {createSlice} from '@reduxjs/toolkit';
import {fetchThumbnailOfImages} from "./Imgur";

const CLIENT_ID = 'c857fe500bb5b23';
const apiBase = 'https://api.imgur.com';
export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        images: [],
        searchModel: {
            section: 'hot',
            sort: null,
            window: null,
            page: 1,
            pageSize: 10,
            showViral: false
        }

    },
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setSection: (state, action) => {
            state.searchModel.section = action.payload;
        },
        loadImages: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new

            // immutable state based off those changes

            state.images = action.payload;
            console.log('WOW',state.images.length);
        },

    },
});

export const {loadImages,setSection} = gallerySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadImagesAsync = (state) => dispatch => {
    const model = state.searchModel;
    const searchUrl = apiBase + `/3/gallery/${model.section}/${model.sort}/${model.window}/1?showViral=${model.showViral}&mature=false&album_previews=true`;
    fetch(searchUrl, {
        headers: {
            Authorization: 'Client-ID ' + CLIENT_ID
        },
        method: 'GET'
    }).then(function (response) {
        response.json().then(function (json) {
            dispatch(loadImages(json.data));
        }).catch(reason => {
            console.log(reason)
        })
    })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const imagesCount = state => state.images?.length;

export default gallerySlice.reducer;
