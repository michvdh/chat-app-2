const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
  try {
    const {username, password, confirmPassword} = req.body;
    const usernameCheck = await User.findOne({username});

    if(usernameCheck) {
      return res.json({msg: "Username already used", status: false});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });
    delete user.password;
    return res.json({status: true, user});

  } catch(ex) {
    next(ex);
  }
};


module.exports.login = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (!user) {
      return res.json({msg: "Incorrect username or password", status: false});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({msg: "Incorrect username or password", status: false});
    }

    delete user.password;
    
    return res.json({status: true, user});

  } catch(ex) {
    next(ex);
  }
};



module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.id }
    }).select([
      "username",
      "_id"
    ]);

    return res.json(users);

  } catch (ex) {
    next(ex);
  }
}

