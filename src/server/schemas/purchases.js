import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Defines a schema (singular)
let schemaPurchase = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  lastUpdate: { type: mongoose.Schema.Types.Date, default: Date.now() },
  purchaseDate: {
    type: mongoose.Schema.Types.Date, 
    default: Date.now(),
    required: true
  },
  tourPackageId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  guestId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  feedback:  { type: mongoose.Schema.Types.String },
  rating: { type: mongoose.Schema.Types.Number }
});

const purchases = mongoose.model('purchase', schemaPurchase);

export default purchases;