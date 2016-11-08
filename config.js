module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '53d03332cdc14aeed23378c56e6eb7c6',
  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || 'ltG7P9ZlCZ15JibYOx76aGwbl',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'V2cHRSrrNsByn6juLT8SrUUdf0CjLypX0bj0TX0c808PZLGUgo'
};