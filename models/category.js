const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the comments
let CategorySchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        subcategories: [String]
    }
)

module.exports = mongoose.model('Category', CategorySchema);
