const locationSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },

  lat: Number,
  lng: Number,

  updatedAt: Date

});

module.exports = mongoose.model("DriverLocation", locationSchema);