const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Turf = require('./models/Turf');
const Rewards = require('./models/Rewards');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected for seeding...'))
  .catch(err => console.error(err));

const seed = async () => {
  try {
    await User.deleteMany();
    await Turf.deleteMany();
    await Rewards.deleteMany();

    const password = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      { name: 'John Doe', email: 'john@example.com', password, role: 'user' },
      { name: 'Owner One', email: 'owner1@example.com', password, role: 'turf_owner' }
    ]);

    await Turf.create([
      {
        name: 'Green Field Sports Complex',
        owner: users[1]._id,
        description: 'Premium sports facility',
        location: { address: 'Banani', city: 'Dhaka' },
        sports: ['Football', 'Cricket'],
        facilities: ['Parking', 'Washroom'],
        pricePerHour: 2000,
        condition: 'Excellent',
        isActive: true
      }
    ]);

    console.log('✅ Seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();