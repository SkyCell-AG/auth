import axios from 'axios'

const avatarKey = 'avatar'

const getAvatar = (token) => {
    const oldSrcImage = localStorage.getItem(avatarKey)

    if (oldSrcImage) {
        return Promise.resolve(oldSrcImage)
    }

    return axios.get('https://graph.microsoft.com/v1.0/me/photos/96x96/$value', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
    })
        .then((arrayBuffer) => {
            const image = btoa(new Uint8Array(arrayBuffer.data).reduce((data, byte) => {
                return data + String.fromCharCode(byte)
            }, ''))

            const srcImage = `data:image/jpeg;base64,${image}`

            localStorage.setItem(avatarKey, srcImage)
            return srcImage
        })
}

export default getAvatar
