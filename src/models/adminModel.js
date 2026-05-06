const { v4: uuidv4 } = require("uuid");
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
        const productWithId = {
            id: uuidv4(),
            ...newProduct
        };
        products.push(productWithId);
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