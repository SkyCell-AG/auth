const checkIfScriptAlreadyLoaded = (url) => {
    const loadedScripts = [...document.getElementsByTagName('script')]

    const loadedScriptsSrc = loadedScripts.map(({
        src,
    }) => {
        return src
    })

    return loadedScriptsSrc.includes(url)
}

export default checkIfScriptAlreadyLoaded
