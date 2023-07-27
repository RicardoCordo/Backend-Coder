import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import adminModel from "../dao/mongo/models/admin.js";
import GitHubStrategy from "passport-github2";

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email } = req.body;
            try {
                const user = await userModel.findOne({ email: username });

                if (user) {
                    return done(null, false, { status: 200, message: "el usuario ya existe" });
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    role: "user",
                }
                let result = await userModel.create(newUser);
                return done(null, result, { message: "Usuario creado" });
            } catch (error) {
                return done("Error al obtener el usuario" + error);
            }

        }
    ));

    passport.use('login', new localStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            if (username == "adminCoder@coder.com" && password == "adminCod3r123") {
                const user = await adminModel.findOne({ email: username });
                if (!user) {
                    const user = await adminModel.create({
                        email: "adminCoder@coder.com",
                        password: createHash(password),
                        role: "admin",
                    });
                    return done(null, user);
                };
                return done(null, user);
            };

            const user = await userModel.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: "usuario o contraseña incorrecta" });
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, { message: "Usuario o contraseña incorrecta" });
            }
            return done(null, user);
        } catch (error) {
            return done("Error al obtener el usuario" + error);
        }
    }
    ));

    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.7fec6939e9de2f5f",
        clientSecret: "24d017a2ab24f4850bbf1e184f8ae83a527f4c1a",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[2],
                    email: profile._json.email,
                    password: "",
                };
                /*Me aparece el siguiente error en consola y no logro identificar porque me dice que las propiedades son nulas 
                Error al conectar con GitHubTypeError: Cannot read properties of null (reading 'split') 
                Si doy a refrescar a pagina me tira el siguiente error
                Error: Failed to obtain access token
    at C:\Users\user\Desktop\43355Cordo\node_modules\passport-oauth2\lib\strategy.js:178:49
    at C:\Users\user\Desktop\43355Cordo\node_modules\oauth\lib\oauth2.js:209:7
    at passBackControl (C:\Users\user\Desktop\43355Cordo\node_modules\oauth\lib\oauth2.js:134:9)
    at IncomingMessage.<anonymous> (C:\Users\user\Desktop\43355Cordo\node_modules\oauth\lib\oauth2.js:157:7)
    at IncomingMessage.emit (node:events:525:35)
    at endReadableNT (node:internal/streams/readable:1359:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)*/
                const result = await userModel.create(newUser);
                return done(null, result);
            } else {
                done(null, user)
            }
        } catch (error) {
            return done("Error al conectar con GitHub" + error);
        }
    }
    ));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        const user = userModel.findById(_id);
        done(null, user);
    });
};


export default initializePassport