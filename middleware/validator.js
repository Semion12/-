import { check } from "express-validator";

export const validator = [
    check('nickname', 'поле должно быть заполнено').not().isEmpty(),
    check('password', 'поле должно быть заполнено').not().isEmpty()
]
