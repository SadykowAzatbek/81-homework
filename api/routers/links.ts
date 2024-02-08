import {Router} from "express";
import Link from "../models/Link";
import {LinkTypes} from "../types";

const linksRouter = Router();

linksRouter.get('/', async (_req, res, next) => {
  try {
    const result = await Link.find();

    res.send(result);
  } catch (err) {

  }
});

linksRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.originalUrl || !req.body.shortUrl) {
      res.status(404).send({error: 'Please, enter link and short link!'});
    }

    const linkData: LinkTypes = {
      originalUrl: req.body.originalUrl,
      shortUrl: req.body.shortUrl,
    };

    const link = new Link(linkData);
    await link.save();

    res.send(link);
  } catch (err) {
    return next(err);
  }
});

export default linksRouter;