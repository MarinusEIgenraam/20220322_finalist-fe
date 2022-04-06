import axios from 'axios'
const source = axios.CancelToken.source();
const { REACT_APP_API_URL } = process.env;

export async function fetchAllFiles(utilityContext) {
    const { setIsLoading, setHasError } = utilityContext;
    // setHasError(false);
    // setIsLoading(true);

    try {
        return await axios.get(`${REACT_APP_API_URL}files`,
            {
                cancelToken: source.token
            }).then((response) => {
            // setIsLoading(false)
            return response
        });
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}

export async function fetchProjectFiles(utilityContext, projectId) {
    const { setIsLoading, setHasError } = utilityContext;
    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${REACT_APP_API_URL}projects/${projectId}`,
            {
                cancelToken: source.token
            }).then((response) => {
            setIsLoading(false)
            return response
        });
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}

export async function fetchProjects(utilityContext) {
    const { setIsLoading, setHasError } = utilityContext;
    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${REACT_APP_API_URL}projects`,
            {
                cancelToken: source.token
            }).then((response) => {
            setIsLoading(false)
            return response
        });
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}