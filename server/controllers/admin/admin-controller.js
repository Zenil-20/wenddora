const Store = require("../../models/admin-store.js");

// Add a new store (Admin can add)
const addStore = async (req, res) => {
  try {
    let { storeName, storeAddress, ownerName, aadharLink, storeGstNumber } = req.body;

    // Trim input values to remove extra spaces
    storeName = storeName?.trim();
    storeAddress = storeAddress?.trim();
    ownerName = ownerName?.trim();
    aadharLink = aadharLink?.trim();
    storeGstNumber = storeGstNumber?.trim();

    // Validate all required fields
    if (!storeName || !storeAddress || !ownerName || !aadharLink || !storeGstNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if store with the given GST number already exists
    const existingStore = await Store.findOne({ storeGstNumber });
    if (existingStore) {
      return res.status(400).json({ message: "Store with this GST number already exists" });
    }

    // Create a new store entry
    const store = new Store({ storeName, storeAddress, ownerName, aadharLink, storeGstNumber });
    await store.save();

    return res.status(201).json({ message: "Store added successfully", store });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

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

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store", error });
  }
};

module.exports = { addStore, getAllStores, getStoreByOwner };
