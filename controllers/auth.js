import { validationResult } from "express-validator"
import { compare, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../modules/user.js"

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nickname, password } = req.body
        const salt = genSaltSync()
        const hash = hashSync(password, salt)
        const candidate = User.findOne(nickname)
        if (candidate){
            return res.status(400).send('такой никнейм уже занят, придумайте другой')
        }
        const newUser = new User({
            nickname,
            password: hash
        })
        const savedUser = await newUser.save()
        return res.status(200).json(savedUser)

    } catch (e) {
        console.log(e)
    }
}

export const login = async (req, res) => {
    try {
        const { nickname, password } = req.body
        if (!password) {
            return res.json({ msg: 'введите пароль' })
        }
        const user = await User.findOne({nickname})
        if (!user) {
            return res.json({ msg: 'такого пользователя нет' })
        }
        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ msg: 'данные введены неверно' })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        return res.status(200).json({ user, token })


    } catch (error) {
        res.send(error)
    }
}