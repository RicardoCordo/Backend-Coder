export const registerUser = (req, res) => {
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
        };
        res.status(201).send({ status: "success", message: "Usuario creado" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
};

export const loginUser = (req, res) => {
    try {
        if (!req.user) return response.status(400).send({ status: "failed", message: "Usuario o contraseña incorrectos" })
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
        };
        return res.status(200).send({ status: 'success', message: "Usuario logeado" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

};

export const logoutUser = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                return res.redirect("/");
            };
            return res.status(500).send("Error al desloguear");
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

};

export const currentUser = (req, res) => {
    try {
        if (req.session.user) {
            return res.status(200).render("current", {
                user: req.session.user,
                documentTitle: "Usuario Actual",
            })
                ;
        } else {
            return res.status(401).json({ message: "No hay usuario actualmente autenticado" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


export const adminUser = (req, res) => {
    try {
        return res.status(200).send(`si ves este mensaje es porque sos admin`);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

};


