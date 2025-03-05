const express = require("express");
const { getAllStores, getStoreByOwner, addStore } = require("../../controllers/admin/admin-controller");

const router = express.Router();

// Routes using controller functions
router.get("/stores", getAllStores);
router.get("/store/:ownerName", getStoreByOwner);
router.post("/add-store", addStore);

module.exports = router;
