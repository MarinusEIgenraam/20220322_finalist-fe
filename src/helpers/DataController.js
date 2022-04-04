import axios from 'axios'
const source = axios.CancelToken.source();
const { REACT_APP_API_URL } = process.env;

export async function fetchAllFiles() {
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

export async function fetchProjectFiles(projectId) {
    try {
        return await axios.get(REACT_APP_API_URL + `files/` + `${projectId}`,
            {
                cancelToken: source.token
            }).then((response) => {
            return response.data
        });
    } catch (e) {
        console.error(e);
    }
}