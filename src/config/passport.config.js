import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import adminModel from "../dao/mongo/models/admin.model.js";
import GitHubStrategy from "passport-github2";
import config from "./config.js";

const localStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const user = await userModel.findOne({ email: username });
                
                if (user) {
                    return done(null, false, { status: 200, message: "el usuario ya existe" });
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
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
        
        const adminEmail =config.adminEmail
        const adminPass = config.adminPassword
        passport.use('login', new localStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                if (username == adminEmail && password == adminPass) {
                    const user = await adminModel.findOne({ email: username });
                    if (!user) {
                        const user = await adminModel.create({
                            email: adminEmail,
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
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: "Iv1.7fec6939e9de2f5f",
                clientSecret: "24d017a2ab24f4850bbf1e184f8ae83a527f4c1a",
                callbackURL: "http://localhost:8080/api/sessions/githubcallback",
                passReqToCallback: true,
            },
            async (req,accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userModel.findOne({ email: profile._json.email });
                    if (!user) {
                        const nameParts = profile._json.name ? profile._json.name.split(" ") : [];
                        const newUser = {
                            first_name: nameParts[0] || "",
                            last_name: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
                            email: profile._json.email,
                            password: "",
                        };
                        const result = await userModel.create(newUser);
                        req.session.user = result;
                        console.log("Nuevo usuario creado:", result.first_name, result.last_name, result.email);
                        return done(null, result);
                    } else {
                        req.session.user = user;
                        console.log("Usuario encontrado:", user.first_name, user.last_name, user.email);
                        return done(null, user);
                    }
                } catch (error) {
                    return done("Error al obtener el usuario" + error);
                }
            }
        )
    );


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        const user = userModel.findById(_id);
        done(null, user);
    });
};


export default initializePassport