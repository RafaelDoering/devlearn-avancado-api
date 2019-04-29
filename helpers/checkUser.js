const jwt = require('jsonwebtoken');

const RSAKey = "qwe";

module.exports = (req, res, next) => {
  jwt.verify(req.headers.authorization, RSAKey, (error, decoded) => {
    if(error){
      res.json({ error: error});
    } else {
      next();
    }
  });
}