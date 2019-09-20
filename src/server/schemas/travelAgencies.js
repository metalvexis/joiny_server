import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Defines a schema (singular)
let schemaTravelAgency = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  lastUpdate: { type: mongoose.Schema.Types.Date, default: Date.now() },
  address: mongoose.Schema.Types.String,
  contact: mongoose.Schema.Types.String,
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  veriCode: { 
    type: mongoose.Schema.Types.String
  },
  isVerified: { 
    type: mongoose.Schema.Types.Boolean
  },
});

const travelAgencies = mongoose.model('travelAgency', schemaTravelAgency );

export default travelAgencies;