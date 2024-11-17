import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { rateLimit } from "express-rate-limit";
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import requestIp from 'request-ip';
import morganMiddleware from "./logger/morgan.logger.js";
import { initializeSocketIO } from "./socket/index.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
});

app.set("io", io); // set io instance to app

// global middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(helmet());
app.use(requestIp.mw());

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res) => {
      return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
    },
    handler: (_, __, ___, options) => {
      throw new ApiError(
        options.statusCode || 500,
        `There are too many requests. You are only allowed ${
          options.max
        } requests per ${options.windowMs / 60000} minutes`
      );
    },
  });

app.use(limiter);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  ); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(morganMiddleware);

//api routes 
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.route.js";
import chatRoutes from "./routes/chat.routes.js";
import { getGeneratedCredentials, seedUsers } from "./seeds/user.seeds.js";
import { seedChatApp } from "./seeds/chat-app-seeds.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

initializeSocketIO(io);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chat-app/messages", messageRoutes);
app.use("/api/v1/chat-app/chats", chatRoutes);
app.post(
    "/api/v1/seed/chat-app",
    // avoidInProduction,
    seedUsers,
    seedChatApp
  );

app.use(errorHandler);
export { httpServer };