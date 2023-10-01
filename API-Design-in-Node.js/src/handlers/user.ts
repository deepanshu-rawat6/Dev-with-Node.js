import prisma from "../configs/db";
import { comparePassowords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: await hashPassword(req.body.password),
        }
    })

    const token = createJWT(user)
    res.json({
        token: token,
    })
}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,

        }
    })

    const isValid = await comparePassowords(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.json({
            message: 'not authorized'
        })
        return
    }

    const token = createJWT(user)
    res.json({
        token: token,
    })
}