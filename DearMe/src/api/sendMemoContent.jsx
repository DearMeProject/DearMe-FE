import axios from 'axios';
import getMemos from './getMemos';

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

    if (response.status === 201){
        await getMemos();
    }
};

export default sendMemoContent;