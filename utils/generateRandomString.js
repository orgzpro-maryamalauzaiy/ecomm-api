const generateRandomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
    // characters.chartAt(Math.floor(Math.random() * characters.length))
    return result
}

module.exports = {generateRandomString}

