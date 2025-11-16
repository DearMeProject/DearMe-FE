import axios from 'axios';
import getClientId from './clientId';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getMemoContent = async (memoId) => {

    const currentClientId = await getClientId();

    const response = await axios.get(`${API_BASE_URL}/api/memos/${memoId}`, {
        headers: {
            'X-Client-Id': currentClientId
        }
    });

    return response.data
};

export default getMemoContent;