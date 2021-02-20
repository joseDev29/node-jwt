const app = require("./app");

//DB Connection
require("./db/mongodb");

app.listen(app.get("port"), () => {
  console.log(`Server listenning on http://localhost:${app.get("port")}`);
});
