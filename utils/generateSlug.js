const { generateRandomString } =  require('./generateRandomString.js') ;

const generateSlug = (_statement) => {

    const randomString = generateRandomString(6)
    return `${String(_statement).toLowerCase().split(" ").join("")}-${randomString}`;
  };

module.exports = {generateSlug}