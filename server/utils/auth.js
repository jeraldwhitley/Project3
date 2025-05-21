const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

module.exports = {
  signToken: function({ _id, username, email }) {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) return req;

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  }
};
