const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    titre: { type: String, required: true },
    courses: { type: [], required: true},
    userId: { type: String, required: true}
});

module.exports = mongoose.model('List', listSchema);
