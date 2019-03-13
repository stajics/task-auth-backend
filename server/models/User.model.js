const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: [true, 'User username required'],
      unique: true,
      trim: true,
      maxlength: 15,
      minlength: 4,
      index: {
        unique: [true, 'User username required']
      }
    },
    password: {
      type: String,
      required: [true, 'User password required'],
      trim: true,
      minlength: 6,
    },
  },
  {
    strict: true,
  },
);

class UserClass {
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toResponse() {
    const responseObj = this.toObject();
    delete responseObj.password;

    return responseObj;
  }
}

User.pre('save', async function beforeSave(next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    return next();
  } catch (err) {
    next(err);
  }
});

User.loadClass(UserClass);
module.exports = mongoose.model('User', User);
