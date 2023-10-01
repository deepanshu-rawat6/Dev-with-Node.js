import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassowords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 10)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
    },
        process.env.JWT_SECRET,
    )
    return token
}

export const protect = (req, res, next) => {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
        res.status(401)
        res.json({
            message: 'not authorized'
        })
        return
    }

    const [, token] = bearerToken.split(' ')

    if (!token) {
        res.status(401)
        res.json({
            message: 'not a valid token'
        })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        res.status(401)
        res.json({
            message: 'not a valid token'
        })
        return
    }
}