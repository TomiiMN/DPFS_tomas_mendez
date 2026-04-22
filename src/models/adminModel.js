const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/products.json")
const readData = () => {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
module.exports = {
    getAll: () => readData(),
    getById: (id) => {
        return readData().find(p => p.id == id)
    },
    create: (newProduct) => {
        const products = readData();
        newProduct.id = products.length ? products.at(-1).id + 1 : 1;
        products.push(newProduct);
        writeData(products);
    },
    update: (id, updatedData) => {
        let products = readData();
        products = products.map(p =>
            p.id == id ? { ...p, ...updatedData, id: Number(id) } : p
        )
        writeData(products);
    },
    delete: (id) => {
        const products = readData().filter(p => p.id != id)
        writeData(products);
    }
}