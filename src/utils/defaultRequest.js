const handler = (cb) => {
    return (params) => {
        return cb(params)
            .then((resp) => {
                return resp.data
            })
    }
}

export default handler
