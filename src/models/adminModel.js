const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/products.json")
const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (e) {
        console.error("Error leyendo datos: ", e);
        return [];
    }
};
const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (e) {
        console.error("Error leyendo datos: ", e);
        return [];
    }
};
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
            p.id == id ? { ...p, ...updatedData } : p
        )
        writeData(products);
    },
    delete: (id) => {
        const products = readData().filter(p => p.id != id)
        writeData(products);
    }
}