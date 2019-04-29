const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const RSAKey = 'qwe';

module.exports.getUser = (req, res) => {
  jwt.verify(req.headers.athorization, RSAKey, (error, decoded) => {
    if(error){
      res.json({ error: error });
    } else {
      res.json(decoded);
    }
  });
}

module.exports.signup = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User();

  newUser.email = req.body.email;
  newUser.password = hashedPassword;

  newUser.save((error, createdUser) => {
    if(error) {
      res.send('error')
    } else {
      res.json(
        {
          token: jwt.sign({ user: createdUser, exp: 120 }, RSAKey),
          email: createdUser.email
        }
      );
    }
  })
}

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (error, findUser) => {
    if(bcrypt.compareSync(req.body.password, findUser.password)){
      res.json(
        {
          token: jwt.sign({ user: findUser }, RSAKey),
          email: findUser.email
        }
      );
    } else {
      res.send('Senha incorreta');
    }
  })
}