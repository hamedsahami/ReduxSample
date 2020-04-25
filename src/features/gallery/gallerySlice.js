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
            state.images = action.payload;
            console.log('WOW', state.images.length);
        },
    },
});

export const {loadImages, setSection} = gallerySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loadImagesAsync = (state) => dispatch => {

    const searchUrl = apiBase + `/3/gallery/${state.section}/${state.sort}/${state.window}/1?showViral=${state.showViral}&mature=false&album_previews=true`;
    fetch(searchUrl, {
        headers: {
            Authorization: 'Client-ID ' + CLIENT_ID
        },
        method: 'GET'
    }).then(function (response) {
        response.json().then(function (json) {
            dispatch(loadImages(json.data.map(function (item) {
                item.link = 'https:/i.imgur.com/'+ item.id+ "l.jpg";
                return item;
            })));
        }).catch(reason => {
            console.log(reason)
        })
    })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const gallery = state => state.gallery;
export default gallerySlice.reducer;
