import mongoose, { Document } from 'mongoose';

export interface ITokenBlacklist extends Document {
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const tokenBlacklistSchema = new mongoose.Schema<ITokenBlacklist>(
    {
        token: {
            type: String,
            required: [true, "token is required to be blacklisted"]
        }
    },
    {
        timestamps: true
    }
);

const tokenBlacklistModel = mongoose.model<ITokenBlacklist>("blacklistTokens", tokenBlacklistSchema);

export default tokenBlacklistModel;