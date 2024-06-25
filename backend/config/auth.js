import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path: "../config/.env"
});

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Redirecting to login.",
                success: false,
                redirect: "/login" // Add a redirect field
            });
        }
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Token verification failed. Redirecting to login.",
            success: false,
            redirect: "/login" // Add a redirect field
        });
    }
};

export default isAuthenticated;
