import axios from 'axios';
import getClientId from './ClientId.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const sendMemoIds = async (memoIds) => {

    const currentClientId = await getClientId();
    const requestBody = {
        memoIds: memoIds
    }
    const response = await axios.post(`${API_BASE_URL}/api/memos/counsel`,
        requestBody,
        {
            headers: {
                'X-Client-Id': currentClientId
            }
        });

    return response.data;
};

export default sendMemoIds;