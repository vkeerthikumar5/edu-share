import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js";
import Group from "./models/Group.js";
import Message from "./models/Message.js";
import multer from "multer";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { authMiddleware } from "./middleware/authen.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://edu-share-zumr.vercel.app/",  // your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running...");
});


mongoose
  .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
      console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));



// Create a new group
app.post("/groups", async (req, res) => {
    try {
      const { name, description, adminId } = req.body;
       
      const newGroup = new Group({
        name,
        description,
        createdBy:adminId, // pass userId from frontend / auth middleware
      });
  
      await newGroup.save();
  
      res.status(201).json({
        message: "Group created successfully",
        group: newGroup,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating group" });
    }
  });

app.get('/get_groups/:adminId',async(req,res)=>{
    try{
        const{adminId}=req.params;
        const groups=await Group.find({createdBy:adminId})
        res.json({groups})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
app.post("/join_group", async (req, res) => {
  try {
    const {  userId,code } = req.body;
    console.log(userId,code)
    // find group by code
    const group = await Group.findOne({ joinCode:code });
    if (!group) return res.status(404).json({ message: "Invalid group code" });

    // check if user already joined
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "Already a member of this group" });
    }

    // add user to group
    group.members.push(userId);
    await group.save();

    res.json({ message: "Joined successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error joining group" });
  }
});


app.get('/get_user_groups/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      
      const groups = await Group.find({ members: userId })
        .populate("createdBy", "name email")  // optional: show admin info
        .populate("members", "name email");   // optional: show user info
  
      res.json({ groups });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/group_info/:group_id',async(req,res)=>{
    try{
            const {group_id}=req.params;
            const info=await Group.findById(group_id)
            console.log(info)
            res.json({info})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
  

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ---------------- RESOURCE ROUTES ---------------- */

// Get all resources for a group
app.get("/groups/:groupId/resources", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group.resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new resource (upload file)
app.post("/groups/:groupId/resources", upload.single("file"), async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const resource = {
      title: req.body.title,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
    };

    group.resources.push(resource);
    await group.save();

    res.json(group.resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a resource
app.delete("/groups/:groupId/resources/:resourceId", async (req, res) => {
  try {
    const { groupId, resourceId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const resource = group.resources.id(resourceId);
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    // Fix file path handling
    if (resource.fileUrl) {
      // Ensure fileUrl is relative (e.g., "uploads/filename.pdf")
      const filePath = path.join(process.cwd(), resource.fileUrl.replace(/^\/+/, ""));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn("Failed to delete file:", err.message);
        }
      }
    }

    // Remove resource from subdocument array
    await resource.deleteOne();
    await group.save();

    res.json(group.resources);
  } catch (err) {
    console.error("Delete resource error:", err); // log the full error
    res.status(500).json({ error: err.message });
  }
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  // detect file type
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    res.setHeader("Content-Type", "application/pdf");
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found!");
    }
  });
});


app.post("/:groupId/messages", async (req, res) => {
  try {
    const { text,userId } = req.body;
    const { groupId } = req.params;

    if (!text) return res.status(400).json({ msg: "Message cannot be empty" });

   

    const message = new Message({
      sender: userId,
      groupId,
      text
    });

    await message.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ msg: "Error sending message", error: err.message });
  }
});

app.get("/:groupId/messages",  async (req, res) => {
  try {
    const { groupId } = req.params;

    

    const messages = await Message.find({ groupId })
      .populate("sender", "name role")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching messages", error: err.message });
  }
});


app.get("/users/:userId/", async (req, res) => {
  try {
    const { userId } = req.params;

    // Count groups where the user is a member
    const count = await Group.countDocuments({ members: userId });

    res.status(200).json({ totalGroups: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// leave a group
app.post("/groups/:groupId/leave", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: "Group not found" });

    // Remove user from members
    group.members = group.members.filter(
      (memberId) => memberId.toString() !== userId
    );
    await group.save();

    res.status(200).json({ msg: "Left group successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default (req, res) => app(req, res);