const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/products.json")
const readData = () => {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};
module.exports = {
    getAll: () => readData(),
    getById: (id) => {
        return readData().find(p => p.id == id)
    },
}