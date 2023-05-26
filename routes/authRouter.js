import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import {validator} from '../middleware/validator.js'
const route = Router()

route.post('/register', validator, register )
route.post('/login', login)

export default route