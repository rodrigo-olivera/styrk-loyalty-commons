const sanitizeJson = (json: any) => {
    const sanitizedJson = { ...json };
    Object.keys(json).map((key: string) => {
        if (key.startsWith("_")) return delete sanitizedJson[key]

        return Object.keys(sanitizedJson[key]).map((subKey: string) => {
            if (subKey.startsWith("_")) return delete sanitizedJson[key]

            return
        })
    })   

    return sanitizedJson;
}
export default sanitizeJson;