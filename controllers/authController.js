require("dotenv").config();
const jwt = require("jsonwebtoken");

const AuthController = {
	authenticateToken(req, res, next) {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) return res.sendStatus(401);

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res
					.status(401)
					.send({
						status: 401,
						message: "Você precisa autenticar seu token para continuar.",
						data: null,
					});
			}
			req.user = user;
			next();
		});
	},
};
module.exports = AuthController;
