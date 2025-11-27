import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Socket.IO for real-time collaboration
const callUsers = new Map(); // Track users in each call

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a call room with user info
  socket.on("join-call", ({ callId, user }) => {
    socket.join(callId);
    socket.callId = callId;
    socket.userName = user.name;
    socket.userImage = user.image;
    
    // Track user in call
    if (!callUsers.has(callId)) {
      callUsers.set(callId, new Map());
    }
    callUsers.get(callId).set(socket.id, {
      name: user.name,
      image: user.image,
    });
    
    console.log(`User ${user.name} (${socket.id}) joined call: ${callId}`);
    
    // Notify others in the call
    socket.to(callId).emit("user-joined", {
      socketId: socket.id,
      user: { name: user.name, image: user.image },
    });
    
    // Send current users to the new joiner
    const currentUsers = Array.from(callUsers.get(callId).entries())
      .filter(([id]) => id !== socket.id)
      .map(([id, user]) => ({ socketId: id, user }));
    socket.emit("current-users", currentUsers);
  });

  // Code editor updates
  socket.on("code-update", ({ callId, code, language, cursorPosition, userId }) => {
    socket.to(callId).emit("code-update", {
      code,
      language,
      cursorPosition,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // Whiteboard drawing updates
  socket.on("draw-update", ({ callId, drawData }) => {
    socket.to(callId).emit("draw-update", {
      ...drawData,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // Terminal updates
  socket.on("terminal-update", ({ callId, history, language }) => {
    socket.to(callId).emit("terminal-update", {
      history,
      language,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // Cursor position updates
  socket.on("cursor-position", ({ callId, position, tool }) => {
    socket.to(callId).emit("cursor-position", {
      position,
      tool,
      user: {
        name: socket.userName,
        socketId: socket.id,
        image: socket.userImage,
      },
    });
  });

  // IDE file system updates
  socket.on("ide-files-update", ({ callId, files, fileTree }) => {
    socket.to(callId).emit("ide-files-update", {
      files,
      fileTree,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // IDE file content updates
  socket.on("ide-file-content", ({ callId, fileName, content }) => {
    socket.to(callId).emit("ide-file-content", {
      fileName,
      content,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // IDE output sharing
  socket.on("ide-output", ({ callId, output }) => {
    socket.to(callId).emit("ide-output", {
      output,
      user: {
        name: socket.userName,
        socketId: socket.id,
      },
    });
  });

  // Leave call room
  socket.on("leave-call", (callId) => {
    if (callUsers.has(callId)) {
      callUsers.get(callId).delete(socket.id);
      if (callUsers.get(callId).size === 0) {
        callUsers.delete(callId);
      }
    }
    socket.leave(callId);
    console.log(`User ${socket.userName} (${socket.id}) left call: ${callId}`);
    socket.to(callId).emit("user-left", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    
    // Clean up user from call
    if (socket.callId && callUsers.has(socket.callId)) {
      callUsers.get(socket.callId).delete(socket.id);
      if (callUsers.get(socket.callId).size === 0) {
        callUsers.delete(socket.callId);
      }
      io.to(socket.callId).emit("user-left", socket.id);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
