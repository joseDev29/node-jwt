const { connect } = require("mongoose");
const config = require("../config");

connect(config.db.uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log("----- Mongo DB Connected");
});
