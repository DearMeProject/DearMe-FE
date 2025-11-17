import axios from 'axios';
import getClientId from './clientId.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getMemos = async () => {

    const currentClientId = await getClientId();

    const response = await axios.get(`${API_BASE_URL}/api/memos`, {
        headers: {
            'X-Client-Id': currentClientId
        }
    });

    return response
};

export default getMemos;