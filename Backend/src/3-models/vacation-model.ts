import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { ILikeModel, LikeModel } from "./like-model";
import { UserModel } from "./user-model";

export interface IVacationModel extends Document {
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  imagePath: string;
  likes: ILikeModel[];
}

export const VacationSchema = new Schema<IVacationModel>(
  {
    destination: {
      type: String,
      required: [true, "Missing Destination."],
      minlength: [1, "Destination must be gte to 1."],
      maxlength: [100, "Destination must be lte to 100."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Missing Description."],
      minlength: [1, "Description must be gte to 1."],
      maxlength: [1000, "Description must be lte to 1000."],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Missing Start date."],
    },
    endDate: {
      type: Date,
      required: [true, "Missing End date."],
    },
    price: {
      type: Number,
      required: [true, "Missing Price."],
      min: [0, "Price must be gte to 0."],
      max: [9999, "Price must be lte to 9999."],
    },
    imagePath: {
      type: String,
      required: [true, "Missing Image path."],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    id: false,
  }
);

VacationSchema.virtual("likes", {
  ref: "LikeModel",
  localField: "_id",
  foreignField: "vacationId",
});

export const VacationModel = model<IVacationModel>(
  "VacationModel",
  VacationSchema,
  "vacations"
);
