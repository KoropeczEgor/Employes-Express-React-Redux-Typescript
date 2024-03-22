const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  all,
  add,
  remove,
  edit,
  employee,
} = require("../controllers/employees");

// /api/employees
router.get("/", auth, all);

// /api/employsees/:id
router.get("/:id", auth, employee);

// /api/employsess/add
router.post("/add", auth, add);

// /api/employsess/remove/:id
router.post("/remove/:id", auth, remove);

// /api/employsess/edit/:id
router.post("/edit/:id", auth, edit);

module.exports = router;
