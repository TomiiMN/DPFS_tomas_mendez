const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/users.json")
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
    create: (newUser) => {
        let users = readData();
        const userWithId = {
            id: uuidv4(),
            ...newUser
        };
        users.push(userWithId);
        writeData(users);
    },
    update: (id, updatedData) => {
        let users = readData();
        users = users.map(p =>
            p.id == id ? { ...p, ...updatedData } : p
        )
        writeData(users);
    },
    delete: (id) => {
        const users = readData().filter(p => p.id != id)
        writeData(users);
    }
}