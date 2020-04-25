import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    imagesCount, loadImagesAsync,setSection
} from './gallerySlice';
import styles from './Gallery.module.css';

export function Gallery() {
    const count = useSelector(imagesCount);
    const dispatch = useDispatch();
    const [searchModel, images] = useState({
        images: [],
        searchModel: {
            section: 'hot',
            sort: null,
            window: null,
            page: 1,
            pageSize: 10,
            showViral: false
        }
    });
    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>{count}</span>
            </div>
            <div>
                <label>Section:</label>  <input  value={searchModel.section} onChange={( e) =>
                dispatch(setSection(e.target.value))
            }/>
            </div>
            <button
                className={styles.button}
                onClick={() =>
                    dispatch(loadImagesAsync(searchModel))
                }
            > Load Images
            </button>
            <div className={styles.row}>

            </div>
        </div>
    );
}
