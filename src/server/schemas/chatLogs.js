import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let schemaMessage = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  sender: { 
    type: mongoose.Schema.Types.String,
    enum: ['guest', 'travelAgent'],
    required: true
  },
  
  message: { type: mongoose.Schema.Types.String, required: true }
});

// Defines a schema (singular)
let schemaChatLog = new Schema({
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  lastUpdate: { type: mongoose.Schema.Types.Date, default: Date.now() },
  agencyId: { type: mongoose.Schema.Types.String, required: true },
  guestId: { type: mongoose.Schema.Types.String, required: true },
  log: [
    schemaMessage
  ]
});

const chatLogs = mongoose.model( 'chatLog', schemaChatLog );
export default chatLogs;