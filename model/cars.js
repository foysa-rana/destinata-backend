import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: [true, "Car name is required"],
        trim: true,
    },
    carImg: {
        type: String,
        required: [true, "Image is required"],
    },
    passengers: {
        type: Number,
        required: [true, "Passengers is required"],
    },
    suitcases: {
        type: Number,
        required: [true, "Suitcases is required"],
    },
    rate: {
        type: Number,
        required: [true, "Rate is required"],
    },
});

const carModel = mongoose.model("car", carSchema);
export default carModel;