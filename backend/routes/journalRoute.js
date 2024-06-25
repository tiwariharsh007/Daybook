import express from "express";
import bodyParser from 'body-parser';
import { createJournal , deleteJournal , getAllJournals, getLikedJournals, likeOrDislike} from "../controllers/journalController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();
 
router.route("/create").post(isAuthenticated,createJournal);
router.route("/delete/:id").delete(isAuthenticated,deleteJournal);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);;
router.route("/allJournals/:id").get(isAuthenticated, getAllJournals);
router.route("/likedJournals/:id").get(isAuthenticated, getLikedJournals);

export default router;