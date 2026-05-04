const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../data/users.json")
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
    create: (newUser) => {
        const users = readData();
        const newId = users.length ? users.at(-1).id + 1 : 1;
        const userWithId = {
            id: newId,
            ...newUser
        };
        users.push(userWithId);
        writeData(users);
    },
    update: (id, updatedData) => {
        let users = readData();
        users = users.map(p =>
            p.id == id ? { ...p, ...updatedData, id: Number(id) } : p
        )
        writeData(users);
    },
    delete: (id) => {
        const users = readData().filter(p => p.id != id)
        writeData(users);
    }
}