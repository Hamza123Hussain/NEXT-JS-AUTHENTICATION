import mongoose from "mongoose";

// Define the user schema
const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Check if the model has already been defined
const Usermodel = mongoose.models.Usermodel || mongoose.model('Usermodel', UserSchema);

export default Usermodel;
