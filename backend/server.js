const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const events = [
  { id: 1, name: "Club Nocturne", date: "Sam 22 Fév 2025", venue: "Le Batofar, Paris",  price: "15 €" },
  { id: 2, name: "Red Room",      date: "Sam 1 Mar 2025",  venue: "Rex Club, Paris",     price: "20 €" },
  { id: 3, name: "Acid Night",    date: "Ven 7 Mar 2025",  venue: "Concrete, Paris",     price: "12 €" },
];

const subscribers = [];

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "NUIT API is running 🎉" });
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/subscribe", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name et email requis" });
  const exists = subscribers.find(s => s.email === email);
  if (exists) return res.json({ message: "Tu es déjà inscrit(e) !" });
  subscribers.push({ name, email, date: new Date() });
  res.json({ message: `Bienvenue ${name} ! Tu seras parmi les premiers informés 🎶` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));