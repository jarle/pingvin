const cors = require("cors")({origin: true});
const c = {
    "rotateLeft": "rotate-left",
    "rotateRight": "rotate-right",
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
            walls,
            enemies,
            mapWidth,
            mapHeight
        } = req.body;

        const {
            x,
            y,
            direction
        } = you;
        const mode = enemies.length > 0? "ATTACK": "SEARCH";

        // avoid walls
        if(direction === "top") {
            const block = walls.filter(w => {
                const xCollision = ((w.x - x) == 0)
                const yCollision = ((y - 1) == w.y)
                return (xCollision && yCollision)
            })
            const collideWithBoundary = Math.abs(y - mapHeight) == 1;
            if(block.length > 0 || collideWithBoundary) {
                res.status(200).send({command: c.rotateRight})
                return
            }
        }
        else if(direction === "bottom") {
            const block = walls.filter(w => {
                const xCollision = ((w.x - x) == 0)
                const yCollision = ((y + 1) == w.y)
                return (xCollision && yCollision)
            })
            const collideWithBoundary = Math.abs(y - mapHeight) == 1;
            if(block.length > 0 || collideWithBoundary) {
                res.status(200).send({command: c.rotateRight})
                return
            }
        }
        else if(direction === "left") {
            const block = walls.filter(w => {
                const xCollision = ((x - 1 ) == w.x)
                const yCollision = ((w.y - y) == 0)
                return (xCollision && yCollision)
            })
            const collideWithBoundary = Math.abs(x - mapHeight) == 1;
            if(block.length > 0 || collideWithBoundary) {
                res.status(200).send({command: c.rotateRight})
                return
            }
        }
        else if(direction === "right") {
            const block = walls.filter(w => {
                const xCollision = ((x + 1 ) == w.x)
                const yCollision = ((w.y - y) == 0)
                return (xCollision && yCollision)
            })
            const collideWithBoundary = Math.abs(x - mapHeight) == 1;
            if(block.length > 0 || collideWithBoundary) {
                res.status(200).send({command: c.rotateRight})
                return
            }
        }
        res.status(200).send({command: c.advance})
    })
};