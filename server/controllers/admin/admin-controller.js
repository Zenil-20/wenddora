const Store = require("../../models/admin-store.js");

// Get all stores (Admin Dashboard)
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores", error });
  }
};

// Get store by owner (Store Owner Dashboard)
const getStoreByOwner = async (req, res) => {
  try {
    const store = await Store.findOne({ ownerName: req.params.ownerName });
    if (!store) return res.status(404).json({ message: "Store not found" });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store", error });
  }
};

module.exports = { getAllStores, getStoreByOwner };
