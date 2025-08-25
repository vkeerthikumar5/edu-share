const ResourceSchema = new mongoose.Schema({
    groupId: String,
    filename: String,
    url: String, // where file stored
    uploadedBy: String,
    createdAt: { type: Date, default: Date.now }
  });
  