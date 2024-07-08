const billSchema = mongoose.Schema(
    {
        items: [itemSchema],
        totalBill: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);
