const Auction = require("../../models/Auction.js");

// Create Auction (Admin)
exports.createAuction = async (req, reply) => {
  try {
    const { itemName, description, startPrice, bidIncrement, startTime, endTime } = req.body;
    const auction = new Auction({
      itemName,
      description,
      startPrice,
      currentPrice: startPrice,
      bidIncrement,
      startTime,
      endTime,
      status: new Date(startTime) > new Date() ? "scheduled" : "active",
    });
    await auction.save();
    reply.send({ message: "Auction created successfully", auction });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
};

// Get All Auctions
exports.getAllAuctions = async (req, reply) => {
  const auctions = await Auction.find();
  reply.send(auctions);
};

// Get Single Auction
exports.getAuction = async (req, reply) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction) return reply.status(404).send({ error: "Auction not found" });
  reply.send(auction);
};
