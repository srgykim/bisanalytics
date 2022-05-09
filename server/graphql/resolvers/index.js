const authResolver = require('./auth');
const newsletterResolver = require('./newsletter');

const rootResolver = {
  ...authResolver,
  ...newsletterResolver
};

module.exports = rootResolver;
