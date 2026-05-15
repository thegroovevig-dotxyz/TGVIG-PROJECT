const Property = require("../models/Property");


// 🏨 REGISTER PROPERTY (HOTEL / LODGE / RESORT)
exports.registerProperty = async (req, res) => {
  try {

    const partnerId = req.user._id;

    const {
      type,
      name,
      location,
      rooms,
      pricePerNight,
      amenities,
      images
    } = req.body;

    const property = await Property.create({
      partnerId,
      type,
      name,
      location,
      rooms,
      pricePerNight,
      amenities,
      images,
      status: "PENDING"
    });

    res.json({
      success: true,
      property
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🏨 GET ALL ACTIVE PROPERTIES
exports.getProperties = async (req, res) => {
  try {

    const properties = await Property.find({
      status: "ACTIVE"
    });

    res.json({
      success: true,
      properties
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// 🏨 GET SINGLE PROPERTY
exports.getProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json({
      success: true,
      property
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};