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
            command: "shoot"
        };
        console.log(JSON.stringify(req));
        //req = JSON.parse(req.body);
        res.status(200).send(content);
        return
        // const x = req.you.x;
        // const y = req.you.y;
        // const direction = req.you.direction;

        // // avoid walls
        // if(direction === "top") {
        //     const block = req.walls.filter(w => {
        //         const xCollision = ((walls.x - x) == 0)
        //         const yCollision = ((walls.y - 1) == y)
        //         return (xCollision && yCollision)
        //     })
        //     if(block.length > 0) {
        //         res.status(200).send(c.retreat)
        //         return
        //     }
        // }
        // else if(direction === "bottom") {
        //     const block = req.walls.filter(w => {
        //         const xCollision = ((walls.x - x) == 0)
        //         const yCollision = ((walls.y + 1) == y)
        //         return (xCollision && yCollision)
        //     })
        //     if(block.length > 0) {
        //         res.status(200).send(c.forward)
        //         return
        //     }
        // }
        // else if(direction === "left") {
        //     const block = req.walls.filter(w => {
        //         const xCollision = ((walls.x + 1 ) == x)
        //         const yCollision = ((walls.y - y) == 0)
        //         return (xCollision && yCollision)
        //     })
        //     if(block.length > 0) {
        //         res.status(200).send(c.right)
        //         return
        //     }
        // }
        // else if(direction === "right") {
        //     const block = req.walls.filter(w => {
        //         const xCollision = ((walls.x - 1 ) == x)
        //         const yCollision = ((walls.y - y) == 0)
        //         return (xCollision && yCollision)
        //     })
        //     if(block.length > 0) {
        //         res.status(200).send(c.left)
        //         return
        //     }
        // }
    })
};