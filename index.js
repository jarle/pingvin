const cors = require("cors")({origin: true});

exports.info = function (req, res) {
    cors(req, res, () => {
        let content = { name: "Jarle", team: "foo" };
        res.status(200).send(content);
    })
};

exports.command = function (req, res) {
    cors(req, res, () => {
        let content = { command: "shoot"};
        res.status(200).send(content);
    })
};