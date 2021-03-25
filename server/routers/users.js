const { Router } = require("express");
const router = Router();

router
  // routes will be specified at the app-level
  .route("/") // equivalent to /users
  .get((request, response) => {
    response.json({ user: "Gary" });
  })
  .post((request, response) => {
    response.json(request.body);
  });
// Router Object
module.exports = router;
