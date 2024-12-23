const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    landLord: { type: mongoose.Schema.Type.ObjectId, ref: 'user', required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    location: { type: String, required: true},
    price: { type: Number, required: true},
    propertyType: { type: String, enum: ['Self-Contain', 'Single Room', '2-Bedroom Flat', '3-Bedroom Flat', 'Duplex', 'Beachhouse', 'Store', 'Bungalow'], required: true},
    status: { type: String, enum: ['Available', 'Unavailable'],default: 'Availble'},
    photos: { type: String, required: true},
    videos: { type: String, required: true},
    amenities: { type: String, default: []}
}, {timestamp: true});

module.exports = mongoose.models('Property', propertySchema);