const bearerToken = (cb) => {
    return ({
        token,
        headers,
        ...rest
    }) => {
        if (!token) {
            return cb(rest)
        }

        return cb({
            ...rest,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        })
    }
}

export default bearerToken
