
import jwt from 'jsonwebtoken'

console.log({ JWT_SECRET: process.env.JWT_SECRET })
export function createAccessToken(userId: string) {
    const payload = { id: userId }

    return jwt.sign(payload, process.env.JWT_SECRET!!, {
        expiresIn: '1d'
    })
}