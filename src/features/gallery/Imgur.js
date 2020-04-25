import React from 'react';

const CLIENT_ID = 'c857fe500bb5b23';
const apiBase = 'https://api.imgur.com';

export const fetchThumbnailOfImages = (searchUrl) => {
    const requestUrl = `${apiBase}/${searchUrl}`;
    return fetch(requestUrl, {
        headers: {
            Authorization: 'Client-ID ' + CLIENT_ID
        },
        method: 'GET'
    }).then(function (response) {
        return response.json().then(function (json) {
            return json.data;
        })
    })
}