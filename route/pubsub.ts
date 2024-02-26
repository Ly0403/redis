import express from "express";
import publish from "../controller/pubsub";

const router = express.Router();

router.get("/", publish);


export default router;