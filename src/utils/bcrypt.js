const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const comparePassword = async (password, hash) => {
  const result = bcrypt.compare(password, hash);

  return result;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
