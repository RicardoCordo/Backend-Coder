
const setCookieController = async (req, res) => {
    try {
        res.cookie("Nueva cookie", "Esta es una cookie", {
            maxAge: 100000,
            signed: true,
        });
        return res.status(200).send(`Nueva cookie definida`);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const getCookieController = async (req, res) => {
    try {
        return res.status(200).send(req.signedCookies);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const deleteCookieController = async (req, res) => {
    try {
        res.clearCookie("Nueva cookie");
        return res.status(200).send(`Cookie eliminada`);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

export default {
    setCookieController,
    getCookieController,
    deleteCookieController

}