import express from "express"; // Import the Express framework

const app = express(); // Create an Express application
const port = 3000;
app.use(express.json()); // Middleware to parse incoming JSON requests

// In-memory data storage for teas
let teaData = []; // Array to store tea data
let nextId = 1; // Auto-incrementing ID for teas

//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body; // Extract `name` and `price` from the request body
  const newTea = { id: nextId++, name, price }; // Create a new tea object with a unique ID
  teaData.push(newTea); // Add the new tea to the array
  res.status(201).send(newTea); // Respond with the created tea object and a 201 status
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData); // Respond with all tea data and a 200 status
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // Find tea by ID (converted from string to number)
  if (!tea) {
    return res.status(404).send("Tea not found."); // Return 404 if tea is not found
  }
  res.status(200).send(tea); // Respond with the found tea object
});

//update a tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found.");
  }
  const { name, price } = req.body; // Extract updated `name` and `price` from the request body
  tea.name = name; // Update the tea's name
  tea.price = price; // Update the tea's price
  res.status(200).send(tea); // Respond with the updated tea object
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found.");
  }
  teaData.splice(index, 1); // Remove the tea from the array, for more refer splice() on mdn
  return res.status(200).send("Tea deleted."); // Respond with a success message
});

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
