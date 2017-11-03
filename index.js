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
        const { 
            you,
            walls
        } = req.body;

        console.log(JSON.stringify(walls))
        const {
            x,
            y,
            direction
        } = you;

        // avoid walls
        if(direction === "top") {
            const block = walls.filter(w => {
                const xCollision = ((w.x - x) == 0)
                const yCollision = ((w.y - 1) == y)
                return (xCollision && yCollision)
            })
            if(block.length > 0) {
                res.status(200).send({command: c.retreat})
                return
            }
        }
        else if(direction === "bottom") {
            const block = walls.filter(w => {
                const xCollision = ((w.x - x) == 0)
                const yCollision = ((w.y + 1) == y)
                return (xCollision && yCollision)
            })
            if(block.length > 0) {
                res.status(200).send({command: c.forward})
                return
            }
        }
        else if(direction === "left") {
            const block = walls.filter(w => {
                const xCollision = ((w.x + 1 ) == x)
                const yCollision = ((w.y - y) == 0)
                return (xCollision && yCollision)
            })
            if(block.length > 0) {
                res.status(200).send({command: c.right})
                return
            }
        }
        else if(direction === "right") {
            const block = walls.filter(w => {
                const xCollision = ((w.x - 1 ) == x)
                const yCollision = ((w.y - y) == 0)
                return (xCollision && yCollision)
            })
            if(block.length > 0) {
                res.status(200).send({command: c.left})
                return
            }
        }
        res.status(200).send({command: c.advance})
    })
};