const cors = require("cors")({origin: true});
const c = {
    "rotate-left": "rotate-left",
    "rotate-right": "rotate-right",
    "advance": "advance",
    "retreat": "retreat",
    "shoot": "shoot",
    "pass": "pass"
}

exports.info = function (req, res) {
    cors(req, res, () => {
        let content = { name: "Jarle", team: "Sandvika" };
        res.status(200).send(content);
    })
};

exports.command = function (req, res) {
    cors(req, res, () => {
        let content = {
            command: c.advance
        };
        res.status(200).send(content);
    })
};