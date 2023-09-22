

export class ViewsDAO {
    constructor() { }


    async getRestoreDao(req, res) {
        try {
            const { user } = req.session;
            const payload = {
                user,
                documentTitle: 'Restore',
            };
            return payload;
        } catch (error) {
            console.log("error dao");;
        }
    }
}


