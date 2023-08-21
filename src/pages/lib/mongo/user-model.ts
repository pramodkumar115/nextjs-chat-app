import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    emailId: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    firstName: {type: String, unique: true, required: true},
    lastName: {type: String, unique: true, required: true}
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema, 'User');

export default UserModel