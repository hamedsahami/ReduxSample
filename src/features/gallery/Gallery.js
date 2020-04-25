import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    gallery, loadImagesAsync,setSection
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
                <label>Section:</label>  <input  value={galleryStore.searchModel.section} onChange={( e) =>
                dispatch(setSection(e.target.value))
            }/>
            </div>
            <button
                className={styles.button}
                onClick={() =>
                    dispatch(loadImagesAsync(galleryStore.searchModel))
                }
            > Load Images
            </button>
            <div className={styles.row}>
                {galleryStore.images.map(function (item) {
                    return <div className={styles.column} key={item.id}>
                        <img src={item.link} />
                        <div title={item.description} className={styles.content}>
                            <h6>Description</h6>
                            {(item.description?item.description.substr(0,20)+'...':'')}</div>
                    </div>
                })}
            </div>
        </div>
    );
}
