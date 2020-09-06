const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f54ae216fd02e8a115e625f")
    .then((user) => {
      // req.user = new User(user.name, user.email, user.cart, user._id);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000, () => {
//     console.log("listen on port 3000");
//   });
// });

mongoose
  .connect(process.env.MONGODB)
  .then((result) => {
    // if (user)
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Aiden",
          email: "test@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(process.env.PORT, () => {
      console.log(`listen on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
