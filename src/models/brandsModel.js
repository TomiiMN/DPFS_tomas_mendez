const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/brands.json")
const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) {
        console.error("Error leyendo datos: ", e);
        return [];
    }
};
module.exports = {
    getAll: () => readData(),
    getById: (id) => {
        return readData().find(p => p.id == id)
    }
}