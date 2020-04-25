import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    imagesCount, loadImagesAsync,
} from './gallerySlice';
import styles from './Gallery.module.css';

export function Thumbnails() {
    const dispatch = useDispatch();
    const [images] = useState({
        images: []
    });

    return (
        images.map(function (item) {
           return <span>asdasda</span>
        })
    );
}
