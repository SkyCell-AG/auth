import checkIfScriptAlreadyLoaded from './checkIfScriptAlreadyLoaded'

const cache = new Map()

function loadScript(url) {
    if (cache.has(url)) {
        return cache.get(url)
    }

    cache.set(url, new Promise((resolve) => {
        const loaded = checkIfScriptAlreadyLoaded(url)

        if (loaded) {
            resolve()
        } else {
            const script = document.createElement('script')

            script.type = 'text/javascript'

            if (script.readyState) {
                script.onreadystatechange = () => {
                    if ((
                        script.readyState === 'loaded'
                    ) || (
                        script.readyState === 'complete'
                    )) {
                        script.onreadystatechange = null
                        resolve(script)
                    }
                }
            } else {
                script.onload = () => {
                    resolve(script)
                }
            }

            script.src = url
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    }))

    return cache.get(url)
}

export default loadScript
