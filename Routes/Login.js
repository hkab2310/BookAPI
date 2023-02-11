const Router = require("express").Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const BookUser = require("../Models/BookUser");
SECRET = "RESTAPI";

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded());

Router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await BookUser.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "user not found, Kindly Register"
            })
        }

        if (user.password !== password) {
            return res.status(402).json({
                status: "failed",
                message: "not authenticated"
            })
        }
        else {
            var token = jwt.sign({
                data : user._id
            }, SECRET, { expiresIn: "7d" });
            res.status(201).json({
                status: "Success",
                token: token,
                userName: userName
            })
        }

    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = Router;