import mongoose from "mongoose";

function generateCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    joinCode: { type: String, unique: true }, // auto-generated
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    resources: [
      {
        title: String,
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate joinCode if not set
groupSchema.pre("save", function (next) {
  if (!this.joinCode) {
    this.joinCode = generateCode();
  }
  next();
});

export default mongoose.model("Group", groupSchema);
