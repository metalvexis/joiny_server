import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Defines a schema (singular)
let schemaTourPackage = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  lastUpdate: { type: mongoose.Schema.Types.Date, default: Date.now() },
  departureDate: { type: mongoose.Schema.Types.Date },
  agencyId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  price: { 
    type: mongoose.Schema.Types.Number, 
    default: 0.0 
  },
  details:  {
    type: mongoose.Schema.Types.String,
    default: ''
  },
  packageType: {
    type: mongoose.Schema.Types.String,
    enum: ['regular', 'joiner'],
    required: true
  },
  pax: {
    type: mongoose.Schema.Types.Number
  }
});

const tourPackages = mongoose.model('tourPackage', schemaTourPackage );

export default tourPackages;