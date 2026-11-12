import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Donor', donorSchema);