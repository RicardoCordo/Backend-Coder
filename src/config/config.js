import dotenv from 'dotenv';
import logger from '../utils/logger.js';


logger.info(process.env.NODE_ENV)
// no se porque si me aparece que corre en development me corre en el puerto 3000 que es de production
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
}
