import { Request, Response } from "express";
import {publisher}  from "../config/redis";

const publish = async (req: Request, res: Response, next: any) => {
  const msg = req.query.msg;
  publisher.isOpen ? null : await publisher.connect();
  await publisher.publish("msg", JSON.stringify(msg));
  res.json();
};

export default publish;
