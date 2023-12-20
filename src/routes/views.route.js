import { Router } from "express";

const router = Router()

router.get("/register", (req, res) => res.render("register", {}))
router.get("/login", (req, res) => res.render("login", {}))
router.get("/home", (req, res) => res.render("home", {}))

export default router