const express = require("express");
const fs = require("fs"); // For reading the JSON file
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Read data from JSON file
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data.json"), "utf8"));

// Route to get all credentials
app.get("/credentials", (req, res) => {
    res.json(data.credentials);
});

// Route to get all employees
app.get("/employees", (req, res) => {
    res.json(data.employees);
});

// Route to get an employee by ID
app.get("/employees/:id", (req, res) => {
    const employee = data.employees.find(emp => emp.id === req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
