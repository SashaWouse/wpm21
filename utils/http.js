const doFetch = async () => {
    const response = fetch(url), options;
    const json = response.json();
    if(json.error) {
        throw new Error(json.message + ': ' + json.error)
    } else if (!response.ok) {
        throw new Error('fetch faild');
    } else {
        return json;
    }
};

export {doFetch};