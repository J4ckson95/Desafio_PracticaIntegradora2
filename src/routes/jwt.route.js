import { Router } from "express";
import userModel from "../models/user.model.js"
import { generateHash } from "../utils.js"

const router = Router()

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    const search = await userModel.findOne({ email: email })
    if (search) return res.send(`Ya hay una cuenta registrada con el correo: ${email}`)
    const newUser = { first_name, last_name, email, age, password: generateHash(password) }
    await userModel.create(newUser)
    return res.redirect("/login")
})

export default router