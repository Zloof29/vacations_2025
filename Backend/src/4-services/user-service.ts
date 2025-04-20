import { cyber } from "../2-utils/cyber";
import { ValidationError } from "../3-models/client-errors";
import { CredentialsModel } from "../3-models/credentials-model";
import { Role } from "../3-models/enums";
import { IUserModel, UserModel } from "../3-models/user-model";

class UserService {
  public async register(user: IUserModel) {
    const existingUser = await UserModel.findOne({ email: user.email }).exec();

    if (existingUser) throw new Error(`Email already exists!`);

    user.roleId = Role.User;

    user.password = cyber.hash(user.password);

    const newUser = new UserModel(user);
    await newUser.save();

    const token = cyber.generateNewToken(newUser);

    return token;
  }

  public async login(credentials: CredentialsModel) {
    const hashedPassword = cyber.hash(credentials.password);

    const user = await UserModel.findOne({
      email: credentials.email,
      password: hashedPassword,
    }).exec();

    // if (!user) throw new Error(`Invalid email or password!`);
    if (!user) throw new ValidationError("Invalid email or password!");

    const token = cyber.generateNewToken(user);
    return token;
  }
}

export const userService = new UserService();
