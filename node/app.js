const Koa = require("koa");
const Router = require("./router/index");
const chalk = require("chalk");
const config = require("./config/project.test");
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(config.dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
mongoose.Promise = global.Promise;
db.once("open", () => {
    console.log(chalk.green("数据库连接成功"))
});
db.on("error", () => {
    console.log(chalk.red("数据库 mongodb connection error:"))
});

const app = new Koa();

Router(app);

app.listen(config.port, (data) => {
  console.log("service successfully listening with:", config.port);
});
