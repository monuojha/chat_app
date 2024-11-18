import { Router } from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
import { sendMessageValidator } from "../validators/message.validator.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validator.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/:chatId")
  .get(mongoIdPathVariableValidator("chatId"), validate, getAllMessages)
  .post(
    upload.fields([{ name: "attachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),
    validate,
    sendMessage
  );

//Delete message route based on Message id

router
  .route("/:chatId/:messageId")
  .delete(
    mongoIdPathVariableValidator("chatId"),
    mongoIdPathVariableValidator("messageId"),
    validate,
    deleteMessage
  );

export default router;
