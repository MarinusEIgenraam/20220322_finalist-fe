import axios from 'axios'
const source = axios.CancelToken.source();
const { REACT_APP_API_URL } = process.env;

export async function fetchProjectFiles() {
    try {
        return await axios.get(REACT_APP_API_URL + `files`,
            {
                cancelToken: source.token
            }).then((response) => {
            return response.data
        });
    } catch (e) {
        console.error(e);
    }
}