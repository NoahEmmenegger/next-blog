import fs from 'fs'

export default function handler(req, res) {

    if (fs.existsSync('./logs')) {
        fs.appendFile(`./logs/${req.body.fileName}`, `${req.body.data}`)

        res.status(200).json({
            message: "logging successfull",
        });
    }

    fs.mkdirSync('./logs');
    fs.appendFile(`./logs/${req.body.fileName}`, `${req.body.data}`)

        res.status(200).json({
            message: "logging successfull",
        });
}