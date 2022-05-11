const removeSpecialChars = (value: string): string => {
    return value.replace(/[^\w\s]/gi, '')
}

export default removeSpecialChars;