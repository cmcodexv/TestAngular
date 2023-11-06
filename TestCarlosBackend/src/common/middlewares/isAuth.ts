import jwtSimple from 'jwt-simple';
import moment from 'moment';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

const ensureAuth = function (req: any, res: any, next: () => void) {

    //verify route
    if (req.url === '/check' || req.url === '/identity/authenticate') {
        next();
    } else {

        if (!req.headers.authorization) {
            return res.status(403).send({ message: "There is no authentication header!" });
        }
        let token = req.headers.authorization.split(" ")[1];
        let payload;
        try {
            if (process.env.jwt_secret_key) {
                payload = jwtSimple.decode(token, process.env.jwt_secret_key);
            }

            if (payload.exp <= moment.unix) {
                return res.status(401).send({ message: 'Your connection has expired, Log in again!' });
            }
        } catch (e) {
            return res.status(500).send({ message: "An error has occurred: " + e });
        }
        req.user = payload;
        next();
    }
};






export default ensureAuth;