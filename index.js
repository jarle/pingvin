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
        let content = { name: "πNGU", team: "Sandvika🐧Sesam" };
        res.status(200).send(content);
    })
};

const directions = ["top", "bottom", "left", "right"]

exports.command = function (req, res) {
    cors(req, res, () => {
        const {
            you,
            walls,
            enemies,
            mapWidth,
            mapHeight,
            bonusTiles
        } = req.body;

        const centerX = mapWidth / 2
        const centerY = mapHeight / 2

        const {
            x,
            y,
            direction
        } = you;

        let mode
        if(enemies[0].hasOwnProperty("x")){
            mode = "ATTACK"
        }
        else {
            mode = "SCAN"
        }
        console.log(`Mode ${mode}`)

        if(mode === "SCAN") {
            // hunt for closest powerup
            if(bonusTiles.length > 0){
                bonusTiles.sort((a, b) => {
                    const dax = Math.abs(x-a.x)
                    const day = Math.abs(y-a.y)
                    const dbx = Math.abs(x-b.x)
                    const dby = Math.abs(y-b.y)
                    const daSum = dax + day
                    const dbSum = dbx + dby
                    return (daSum-dbSum)
                })
                const target = bonusTiles[0]

                if(direction === "top") {
                    if(target.y < y) {
                        const block = walls.filter(w => {
                            const xCollision = ((w.x - x) == 0)
                            const yCollision = ((y - 1) === w.y)
                            return (yCollision && xCollision)
                        })
                        if(block.length > 0) {
                            res.status(200).send({command: c.shoot})
                            return
                        }
                        res.status(200).send({command: c.advance})
                        return
                    }
                    else if (target.y > y){
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    // rotate in place
                    if(target.x > x) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    else if(target.x < x) {
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
                if(direction === "bottom") {
                    if(target.y > y) {
                        const block = walls.filter(w => {
                            const xCollision = ((w.x - x) == 0)
                            const yCollision = ((y + 1) === w.y)
                            return (yCollision && xCollision)
                        })
                        if(block.length > 0) {
                            res.status(200).send({command: c.shoot})
                            return
                        }
                        res.status(200).send({command: c.advance})
                        return
                    }
                    else if (target.y < y){
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    // rotate in place
                    if(target.x > x) {
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                    else if(target.x < x) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                }
                if(direction === "right") {
                    if(target.x > x) {
                        const block = walls.filter(w => {
                            const xCollision = ((x + 1) === w.x)
                            const yCollision = ((w.y - y) == 0)
                            return (xCollision && yCollision)
                        })
                        if(block.length > 0) {
                            res.status(200).send({command: c.shoot})
                            return
                        }
                        res.status(200).send({command: c.advance})
                        return
                    }
                    else if(target.x < x) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    // rotate in place
                    if(target.y < y) {
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                    else if(target.y > y) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                }
                if(direction === "left") {
                    if(target.x < x) {
                        const block = walls.filter(w => {
                            const xCollision = ((x - 1) === w.x)
                            const yCollision = ((w.y - y) == 0)
                            return (xCollision && yCollision)
                        })
                        if(block.length > 0) {
                            res.status(200).send({command: c.shoot})
                            return
                        }
                        res.status(200).send({command: c.advance})
                        return
                    }
                    else if(target.x > x) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    // rotate in place
                    if(target.y < y) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                    else if(target.y > y) {
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
            }
            // avoid walls
            if(direction === "top") {
                const block = walls.filter(w => {
                    const xCollision = ((w.x - x) == 0)
                    const yCollision = ((y - 1) == w.y)
                    return (xCollision && yCollision)
                })
                const collideWithBoundary = (y == 0);
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
                const collideWithBoundary = ((mapHeight - y) == 1)
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
                const collideWithBoundary = (x === 0)
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
                const collideWithBoundary = ((mapWidth - x) == 1)
                if(block.length > 0 || collideWithBoundary) {
                    res.status(200).send({command: c.rotateRight})
                    return
                }
            }
            res.status(200).send({command: c.advance})
            return
        }
        else { // attack
            enemyX = enemies[0].x;
            enemyY = enemies[0].y;

            if(enemyX === x) {
                if(enemyY < y) {
                    if(direction !== "top") {
                        if(direction !== "right") {
                            res.status(200).send({command: c.rotateRight})
                            return
                        }
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
                else if(enemyY > y) {
                    if(direction !== "bottom") {
                        if(direction !== "left") {
                            res.status(200).send({command: c.rotateRight})
                            return
                        }
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
            }

            else if(enemyY === y) {
                if(enemyX > x) {
                    if(direction !== "right") {
                        if(direction !== "bottom") {
                            res.status(200).send({command: c.rotateRight})
                            return
                        }
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
                else if(enemyX < x) {
                    if(direction !== "left") {
                        if(direction !== "top") {
                            res.status(200).send({command: c.rotateRight})
                            return
                        }
                        res.status(200).send({command: c.rotateLeft})
                        return
                    }
                }
            }
            else {
                // avoid walls (i copy-pasted this because im sleepy)
                if(direction === "top") {
                    const block = walls.filter(w => {
                        const xCollision = ((w.x - x) == 0)
                        const yCollision = ((y - 1) == w.y)
                        return (xCollision && yCollision)
                    })
                    const collideWithBoundary = (y == 0);
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
                    const collideWithBoundary = ((mapHeight - y) == 1)
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
                    const collideWithBoundary = (x === 0)
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
                    const collideWithBoundary = ((mapWidth - x) == 1)
                    if(block.length > 0 || collideWithBoundary) {
                        res.status(200).send({command: c.rotateRight})
                        return
                    }
                }
                res.status(200).send({command: c.advance})
                return
            }

            res.status(200).send({command: c.shoot})
        }
    })
};