import FingerprintJS from '@fingerprintjs/fingerprintjs';

const LOCAL_STORAGE_KEY = 'app_visitor_id';

const getClientId = async () => {

    const storedId = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedId) {
        return storedId;
    }

    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const newVisitorId = result.visitorId;

    localStorage.setItem(LOCAL_STORAGE_KEY, newVisitorId);
    return newVisitorId;
};

export default getClientId;