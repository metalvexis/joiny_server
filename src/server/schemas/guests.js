import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Defines a schema (singular)
let schemaGuest = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  lastUpdate: { type: mongoose.Schema.Types.Date, default: Date.now() },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  username: { 
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  firstName: {
    type: mongoose.Schema.Types.String
  },
  lastName: {
    type: mongoose.Schema.Types.String
  },
  middleName: {
    type: mongoose.Schema.Types.String
  },
  contact: {
    type: mongoose.Schema.Types.String
  },
  veriCode: { 
    type: mongoose.Schema.Types.String
  },
  isVerified: { 
    type: mongoose.Schema.Types.Boolean
  },

});

const guests = mongoose.model('guest', schemaGuest );

export default guests;