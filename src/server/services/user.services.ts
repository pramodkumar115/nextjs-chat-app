import crypto from 'crypto';
import UserModel from '@/server/lib/mongo/user-model';

class UserService {
    public checkLogin = async (emailId: string, password: string) => {
        return await UserModel.find({emailId, password: this.hashPassword(password)});
    }
    private hashPassword = (password: string) => {
        return crypto.createHash("sha256").update(password).digest("hex");
    }
    public save = async (userModel: any) => {
        const user = new UserModel({
            ...userModel, 
            password: this.hashPassword(userModel.password)
        });
        await user.save();
    }
    public searchByEmailId = async (emailId: string) => {
        return await UserModel.find({emailId});
    }

    public getAllUsers = async () => {
        return await UserModel.find();
    }
}
export default UserService;