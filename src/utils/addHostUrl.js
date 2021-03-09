const addHostURL = (host) => {
    return (cb) => {
        return ({
            url, ...rest
        }) => {
            if (!url) {
                return cb({
                    ...rest,
                    url: host,
                })
            }
            return cb({
                ...rest,
                url: `${host}/${url}`,
            })
        }
    }
}

export default addHostURL
