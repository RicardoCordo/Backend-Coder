import dotenv from 'dotenv';

const environment = process.env.NODE_ENV
dotenv.config({
  path: environment === "development" ? "./.env.development" : "./.env.production"
});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  secretCode: process.env.SESSION_CODESECRET,
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PASSWORD

}
