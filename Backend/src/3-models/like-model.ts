import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { VacationModel } from "./vacation-model";
import { UserModel } from "./user-model";

export interface ILikeModel extends Document {
  userId: ObjectId;
  vacationId: ObjectId;
}

export const SchemaLike = new Schema<ILikeModel>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing userId."],
    },
    vacationId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Missing vacationId"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

SchemaLike.virtual("user", {
  ref: UserModel,
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

SchemaLike.virtual("vacation", {
  ref: VacationModel,
  localField: "vacationId",
  foreignField: "_id",
  justOne: true,
});

export const LikeModel = model<ILikeModel>("LikeModel", SchemaLike, "likes");
