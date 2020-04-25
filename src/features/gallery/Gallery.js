import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    gallery, loadImagesAsync, setSection, setShowViral, setSort
} from './gallerySlice';
import styles from './Gallery.module.css';

export function Gallery() {
    const galleryStore = useSelector(gallery);
    const dispatch = useDispatch();
    const [searchModel] = useState({searchModel: galleryStore.searchModel});
    return (
        <div>
            <div className={styles.row}>
                <span className={styles.value}>{0}</span>
            </div>
            <div>
                <label>Section:</label>
                <select onChange={(e) =>
                    dispatch(setSection(e.target.value))
                }>
                    <option>hot</option>
                    <option>top</option>
                    <option>user</option>
                </select>
            </div>
            <div>
                <label>Viral:</label>
                <select onChange={(e) =>
                    dispatch(setShowViral(e.target.value))
                }>
                    <option value={true}>show</option>
                    <option value={false}>hidden</option>
                </select>
            </div>
            <div>
                <label>Sort:</label>
                <select onChange={(e) =>
                    dispatch(setSort(e.target.value))
                }>
                    <option >viral</option>
                    <option >top</option>
                    <option >time</option>
                    <option >rising</option>

                </select>
            </div>
            <div className={styles.actionBar}>
                <button
                    className={styles.button}
                    onClick={() =>
                        dispatch(loadImagesAsync(galleryStore.searchModel))
                    }
                > Load Images
                </button>
            </div>
            <div className={styles.row}>
                {galleryStore.images.map(function (item) {
                    return <div className={styles.column} key={item.id}>
                        <img src={item.link}/>
                        <div title={item.description} className={styles.content}>
                            <h6>Description</h6>
                            {(item.description ? item.description.substr(0, 20) + '...' : '')}</div>
                    </div>
                })}
            </div>
        </div>
    );
}
