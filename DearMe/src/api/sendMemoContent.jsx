import axios from 'axios';
import getClientId from './clientId.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const sendMemoContent = async (memo) => {

    const currentClientId = await getClientId();

    const response = await axios.post(`${API_BASE_URL}/api/memos`,
        memo,
        {
            headers: {
                'X-Client-Id': currentClientId
            }
        });

    return response;
};

export default sendMemoContent;