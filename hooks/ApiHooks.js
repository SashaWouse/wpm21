import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
        setMediaArray(await loadMedia());
    })();
    }, []);

    const loadMedia = async () => {
    try {
        const mediaIlmanThumbnailia = await doFetch(baseUrl + 'media');
        const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
            return await loadSingleMedia(media.file_id);
        });
        return Promise.all(kaikkiTiedot);
    } catch (e) {
        console.log(e.message);
    }
};

    const loadSingleMedia = async (id) => {

        try {
            const tiedosto = await doFetch(baseUrl + 'media/' + id);
            return tiedosto;
        } catch (e) {
            console.log('loadSingleMedia');
            throw new Error('loadSingleMedia fail');
        }
    };

    return {mediaArray, loadMedia, loadSingleMedia};
};

export {useMedia};