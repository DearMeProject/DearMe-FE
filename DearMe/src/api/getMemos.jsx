import axios from 'axios';
import getClientId from './clientId';

const getMemos = async () => {

    const currentClientId = await getClientId();

    const response = await axios.get('/api/memos', {
        headers: {
            'X-Client-Id': currentClientId
        }
    });

    return response.data;

};

export default getMemos;