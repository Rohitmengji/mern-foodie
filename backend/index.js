// const express = require("express");
// const app = express();
// const port = 5000;

// global.foodData = require("./db")(function call(err, data, CatData) {
//   if (err) console.log(err);
//   global.foodData = data;
//   global.foodCategory = CatData;
// });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000",);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/api/auth", require("./Routes/Auth"));

// app.listen(port, () => {
//   console.log(`app listening on http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const port = 5000;

global.foodData = require("./db")(function call(err, data, CatData) {
  if (err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

// allow origin
const allowedOrigins = [
  "http://localhost:3000",
  "https://main.d3mptr6n33j4yf.amplifyapp.com",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./Routes/Auth"));

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
