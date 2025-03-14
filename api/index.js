// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// const filePath = path.join(__dirname, "../data.json");

// // Helper function to read JSON file
// const readData = () => {
//     return JSON.parse(fs.readFileSync(filePath, "utf8"));
// };

// // Helper function to write JSON file
// const writeData = (data) => {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

// // ✅ **GET all credentials**
// app.get("/credentials", (req, res) => {
//     const data = readData();
//     res.json(data.credentials);
// });

// // ✅ **GET a specific credential by ID**
// app.get("/credentials/:id", (req, res) => {
//     const data = readData();
//     const credential = data.credentials.find(cred => cred.id === req.params.id);
//     credential ? res.json(credential) : res.status(404).json({ message: "Credential not found" });
// });

// // ✅ **POST - Add new credential**
// app.post("/credentials", (req, res) => {
//     const data = readData();
//     const newCredential = { id: Date.now().toString(36), ...req.body };
//     data.credentials.push(newCredential);
//     writeData(data);
//     res.json(newCredential);
// });

// // ✅ **PUT - Update credential**
// app.put("/credentials/:id", (req, res) => {
//     const data = readData();
//     const index = data.credentials.findIndex(cred => cred.id === req.params.id);
//     if (index === -1) return res.status(404).json({ message: "Credential not found" });

//     data.credentials[index] = { ...data.credentials[index], ...req.body };
//     writeData(data);
//     res.json(data.credentials[index]);
// });

// // ✅ **DELETE - Remove credential**
// app.delete("/credentials/:id", (req, res) => {
//     const data = readData();
//     data.credentials = data.credentials.filter(cred => cred.id !== req.params.id);
//     writeData(data);
//     res.json({ message: "Credential deleted successfully" });
// });

// // ✅ **GET all employees**
// app.get("/employees", (req, res) => {
//     const data = readData();
//     res.json(data.employees);
// });

// // ✅ **GET a specific employee by ID**
// app.get("/employees/:id", (req, res) => {
//     const data = readData();
//     const employee = data.employees.find(emp => emp.id === req.params.id);
//     employee ? res.json(employee) : res.status(404).json({ message: "Employee not found" });
// });

// // ✅ **POST - Add new employee**
// app.post("/employees", (req, res) => {
//     const data = readData();
//     const newEmployee = { id: Date.now().toString(36), ...req.body };
//     data.employees.push(newEmployee);
//     writeData(data);
//     res.json(newEmployee);
// });

// // ✅ **PUT - Update employee**
// app.put("/employees/:id", (req, res) => {
//     const data = readData();
//     const index = data.employees.findIndex(emp => emp.id === req.params.id);
//     if (index === -1) return res.status(404).json({ message: "Employee not found" });

//     data.employees[index] = { ...data.employees[index], ...req.body };
//     writeData(data);
//     res.json(data.employees[index]);
// });

// // ✅ **DELETE - Remove employee**
// app.delete("/employees/:id", (req, res) => {
//     const data = readData();
//     data.employees = data.employees.filter(emp => emp.id !== req.params.id);
//     writeData(data);
//     res.json({ message: "Employee deleted successfully" });
// });

// // **Start the server**
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

// Handle preflight requests
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
});

const filePath = path.join(__dirname, "../data.json");

// Helper function to read JSON file
const readData = () => {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

// Helper function to write JSON file
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ✅ **GET all credentials**
app.get("/credentials", (req, res) => {
    const data = readData();
    res.json(data.credentials);
});

// ✅ **GET a specific credential by ID**
app.get("/credentials/:id", (req, res) => {
    const data = readData();
    const credential = data.credentials.find(cred => cred.id === req.params.id);
    credential ? res.json(credential) : res.status(404).json({ message: "Credential not found" });
});

// ✅ **POST - Add new credential**
app.post("/credentials", (req, res) => {
    const data = readData();
    const newCredential = { id: Date.now().toString(36), ...req.body };
    data.credentials.push(newCredential);
    writeData(data);
    res.json(newCredential);
});

// ✅ **PUT - Update credential**
app.put("/credentials/:id", (req, res) => {
    const data = readData();
    const index = data.credentials.findIndex(cred => cred.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Credential not found" });

    data.credentials[index] = { ...data.credentials[index], ...req.body };
    writeData(data);
    res.json(data.credentials[index]);
});

// ✅ **DELETE - Remove credential**
app.delete("/credentials/:id", (req, res) => {
    const data = readData();
    data.credentials = data.credentials.filter(cred => cred.id !== req.params.id);
    writeData(data);
    res.json({ message: "Credential deleted successfully" });
});

// ✅ **GET all employees**
app.get("/employees", (req, res) => {
    const data = readData();
    res.json(data.employees);
});

// ✅ **GET a specific employee by ID**
app.get("/employees/:id", (req, res) => {
    const data = readData();
    const employee = data.employees.find(emp => emp.id === req.params.id);
    employee ? res.json(employee) : res.status(404).json({ message: "Employee not found" });
});

// ✅ **POST - Add new employee**
app.post("/employees", (req, res) => {
    const data = readData();
    const newEmployee = { id: Date.now().toString(36), ...req.body };
    data.employees.push(newEmployee);
    writeData(data);
    res.json(newEmployee);
});

// ✅ **PUT - Update employee**
app.put("/employees/:id", (req, res) => {
    const data = readData();
    const index = data.employees.findIndex(emp => emp.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Employee not found" });

    data.employees[index] = { ...data.employees[index], ...req.body };
    writeData(data);
    res.json(data.employees[index]);
});

// ✅ **DELETE - Remove employee**
app.delete("/employees/:id", (req, res) => {
    const data = readData();
    data.employees = data.employees.filter(emp => emp.id !== req.params.id);
    writeData(data);
    res.json({ message: "Employee deleted successfully" });
});

// **Start the server**
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
