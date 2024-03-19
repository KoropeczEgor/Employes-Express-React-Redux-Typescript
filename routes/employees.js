const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add } = require("../controllers/employees");

// /api/employees
router.get("/", auth, all);

// /api/employsees/:id
router.get("/:id", auth, () => console.log("get single employees"));

// /api/employsess/add
router.post("/add", auth, add);

// /api/employsess/remove/:id
router.post("/remove/:id", auth, () => console.log("remove employees"));

// /api/employsess/edit/:id
router.post("/edit/:id", auth, () => console.log("edit employees"));

module.exports = router;
