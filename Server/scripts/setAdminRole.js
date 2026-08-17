// One-off CLI helper to promote an existing account to admin.
// Usage (run from the Server directory): node scripts/setAdminRole.js you@example.com
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../model/userSchema');

const email = process.argv[2];

if (!email) {
    console.log('Usage: node scripts/setAdminRole.js <email>');
    process.exit(1);
}

mongoose.connect(process.env.DATABASE)
    .then(async () => {
        const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (!user) {
            console.log(`No user found with email ${email}`);
        } else {
            console.log(`${user.email} is now an admin`);
        }
        await mongoose.disconnect();
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to connect / update:', err);
        process.exit(1);
    });
