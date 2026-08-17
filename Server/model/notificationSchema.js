const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'success', 'warning', 'danger'], default: 'info' },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    dismissedBy: [{ type: mongoose.Schema.Types.ObjectId }]
});

const Notification = mongoose.model('Notification', notificationSchema, 'notifications');

module.exports = Notification;
