import { Document, Schema, model } from "mongoose";
import { Role } from "./enums";

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: Role;
}

export const SchemaUser = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing first name."],
      minlength: [2, "FirstName must be gte to 2."],
      maxlength: [50, "FirstName must ne lte to 50."],
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name."],
      minlength: [2, "LastName must be gte to 2."],
      maxlength: [50, "LastName must be lte to 50."],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Missing email."],
      minlength: [10, "Email must be gte to 10."],
      maxlength: [100, "Email must be lte to 100."],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Missing Password."],
      minlength: [8, "Password must be gte to 8."],
      maxlength: [128, "Password must be lte to 128."],
    },
    roleId: {
      type: String,
      required: [true, "Missing roleId."],
    },
  },
  { versionKey: false, timestamps: true, id: false }
);

export const UserModel = model<IUserModel>("UserModel", SchemaUser, "users");
