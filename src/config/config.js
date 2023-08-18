import dotenv from 'dotenv'

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGODB_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    secretCode: process.env.SESSION_CODESECRET
}
