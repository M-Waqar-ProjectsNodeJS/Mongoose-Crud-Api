const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bookRoute = require("./api/route/booksRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", bookRoute);

app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

const port = 3000;
app.listen(port, (error) => {
  if (error) console.log(error);
  else console.log(`Server is listening at Port: ${port}`);
});
