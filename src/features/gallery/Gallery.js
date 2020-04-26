import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    gallery, loadImagesAsync, setSection, setShowViral, setSort, setShowModal, setSelectedImage, fetchVotesData
} from './gallerySlice';
import styles from './Gallery.module.css';
import Modal from 'react-modal';

export function Gallery() {
    const galleryStore = useSelector(gallery);
    const dispatch = useDispatch();
    return (
        <div>
            <div className={styles.row}>
                <h3>Imgur Gallery(ReactJS,Redux) </h3>
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
                    <option>viral</option>
                    <option>top</option>
                    <option>time</option>
                    <option>rising</option>

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
                    return <div onClick={() => dispatch(fetchVotesData(item))} className={styles.column}
                                key={item.id}>
                        <img height={160} src={item.thumbLink}/>
                        <div title={item.description} className={styles.content}>
                            <h6>Description</h6>
                            {(item.description ? item.description.substr(0, 20) + '...' : '')}</div>
                    </div>
                })}
            </div>
            <Modal isOpen={galleryStore.showModal}
                   ariaHideApp={false}
                   contentLabel="Minimal Modal Example">
                <button className={styles.button} onClick={() => dispatch(setShowModal())}>Close Modal</button>
                <div className={styles.row}>
                    <div className={styles.column}>
                        {/*Use Large link instead of Image link for more stability*/}
                        <img src={galleryStore.selectedImage.LargeLink}  title={galleryStore.selectedImage.title}/>
                        <div title={galleryStore.selectedImage.description} className={styles.details}>
                            <h3>Details</h3>
                            <p><label>Title:</label><span>{galleryStore.selectedImage.title}</span></p>
                            <p><label>Description:</label><span>{galleryStore.selectedImage.title}</span></p>
                            <p><label>Up Votes:</label><span>{galleryStore.selectedImage.ups}</span></p>
                            <p><label>Down Votes:</label><span>{galleryStore.selectedImage.downs}</span></p>
                            <p><label>Score:</label><span>{galleryStore.selectedImage.score}</span></p>
                            <p><label>Original Link:</label><a href={galleryStore.selectedImage.link}  target={'_blank'}>{galleryStore.selectedImage.link}</a></p>


                        </div>
                    </div>

                </div>

            </Modal>
        </div>
    );
}
