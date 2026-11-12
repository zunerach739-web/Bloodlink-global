import express from 'express';
import Donor from '../models/Donor.js';
const router = express.Router();

// TEMP STORAGE if MongoDB not connected
let tempDonors = [
  { _id: '1', name: 'Ali from Faisalabad', bloodGroup: 'B+', phone: '0300-1234567', country: 'Pakistan', city: 'Faisalabad' },
  { _id: '2', name: 'John USA', bloodGroup: 'O+', phone: '+1-202-555-0100', country: 'USA', city: 'New York' }
];

// Register Donor
router.post('/register', async (req, res) => {
  try {
    const newDonor = { _id: Date.now().toString(), ...req.body };
    tempDonors.push(newDonor);
    // If MongoDB connected, also save to DB
    try { await Donor.create(req.body); } catch(e) {}
    res.json({ success: true, donor: newDonor });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Search donors - from MongoDB
router.get('/search', async (req, res) => {
  try {
    const { bloodGroup, country, city } = req.query;
    let query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (country) query.country = { $regex: country, $options: 'i' };
    if (city) query.city = { $regex: city, $options: 'i' };

    const donors = await Donor.find(query);
    res.json(donors);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;