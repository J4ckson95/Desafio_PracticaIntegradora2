import { Router } from "express";
import passport from "passport";
import userModel from "../models/user.model.js"
import { generateHash, validateHash, generateToken } from "../utils.js"

const router = Router()

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    const search = await userModel.findOne({ email: email })
    if (search) return res.send(`Ya hay una cuenta registrada con el correo: ${email}`)
    const newUser = { first_name, last_name, email, age, password: generateHash(password) }
    await userModel.create(newUser)
    return res.redirect("/login")
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (!user) return res.status(401).send({ status: "Error", Error: "Invalid Credentials" })
    if (!validateHash(user, password)) return res.status(403).send({ status: "Error", Error: "Invalid Password" })
    const token = generateToken(user)
    res.cookie("authToken", token).redirect("/home")

})
router.get("/session/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { user } = req.user
        res.send({ status: "Succes", payload: user })
    })
export default router