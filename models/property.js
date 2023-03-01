import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    propertyId: {
        type: String,
        required: [true, "Please Enter Property ID"],
    },
    name: {
        type: String,
        required: [true, "Please Enter Property Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter Property Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Property Price"],
        maxLength: [10, "Price cannot exceed 10 characters"],
    },
    type: {
        type: String,
        required: true,
        enum: ["Sale", "Rent"],
    },
    category: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: true,
    },
    coordinate: {
        lat: { type: String },
        lng: { type: String },
    },
    details: {
        areaSqM: {
            type: Number,
            default: 0
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    features: {
        ac: { type: Boolean, default: false },
        balcony: { type: Boolean, default: false },
        tv: { type: Boolean, default: false },
        internet: { type: Boolean, default: false },
        pet: { type: Boolean, default: false },
        bathtub: { type: Boolean, default: false },
    },
    services: {
        security: { type: Boolean, default: false },
        cctv: { type: Boolean, default: false },
        elevator: { type: Boolean, default: false },
        pool: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        parking: { type: Boolean, default: false },
        garden: { type: Boolean, default: false },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        default: "Available",
        enum: ["Available", "Sold", "Rented", "Expired"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Property ||
    mongoose.model("Property", PropertySchema);
