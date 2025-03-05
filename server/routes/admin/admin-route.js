const express = require("express");
const { getAllStores, getStoreByOwner } = require("../../controllers/admin/admin-controller");

const router = express.Router();

// Routes using controller functions
router.get("/stores", getAllStores);
router.get("/store/:ownerName", getStoreByOwner);

module.exports = router;
