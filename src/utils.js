import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname
//!---------------------------------------------------------
const PRIVATE_KEY = "C0D3RH0US3"
export const generateToken = (user) => {
    const token = Jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}
//!---------------------------------------------------------
export const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
export const validateHash = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}