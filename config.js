exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  'mongodb://evan:mila-is-my-love12@ds237947.mlab.com:37947/searchule';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
