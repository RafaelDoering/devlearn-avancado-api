const User = require('../models/User');

exports.signup = (req, res) => {
  if (req.body.name && req.body.password) {
    const newUser = new User();

    newUser.name = req.body.name;
    newUser.password = hash;

    newUser.save((errUser, createdUser) => {
      if (errUser) {
        return res.status(400).json({
          errors: ['Email já utilizado.']
        });
      } else {
        return res.status(200).json({
          user: {
            name: createdUser.name
          }
        });
      }
    });
  } else {
    res.status(400).json({
      errors: ['Error.']
    });
  }
};

exports.login = (req, res) => {
  if (req.body.name && req.body.password) {
    User.findOne({ name: req.body.name }, (errUser, userFound) => {
      if (errUser) {
        return res.status(400).json({
          ...errUser
        });
      } else {
        if (userFound) {
          if (bcrypt.compareSync(req.body.password, userFound.password)) {
            return res.status(200).json({
              user: {
                name: userFound.name
              }
            });
          } else {
            return res.status(400).json({
              errors: ['Senha incorreta.']
            });
          }
        } else {
          return res.status(400).json({
            errors: ['Email não existente.']
          });
        }
      }
    });
  } else {
    res.status(400).json({
      errors: ['Error.']
    });
  }
};
