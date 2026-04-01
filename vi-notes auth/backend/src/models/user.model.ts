import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        unique: [true, "username already taken"] as any,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        unique: [true, "email already taken"] as any,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }
});

const userModel = mongoose.model<IUser>("users", userSchema);

export default userModel;