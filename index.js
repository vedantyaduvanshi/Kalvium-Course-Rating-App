const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


let courses = [
  { id: '1234', name: 'Node Js', description: 'Node Js Course' },
  { id: '5678', name: 'FOSS', description: 'Free and Open Source Software Course' }
];

let ratings = {}; 


app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).send('Course not found');
  res.json(course);
});

app.post('/courses', (req, res) => {
  const course = req.body;
  courses.push(course);
  console.log(req.body)
  res.status(201).json(course);
});

app.put('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).send('Course not found');

  course.name = req.body.name;
  course.description = req.body.description;

  res.json(course);
});

app.post('/courses/:id/rating', (req, res) => {
  const courseId = req.params.id;
  console.log(req.body)
  const rating = req.body.rating;

  if (!ratings[courseId]) {
    ratings[courseId] = [];
  }

  ratings[courseId].push(rating);
  res.status(201).send('Rating added successfully');
});

app.get('/courses/:id/rating', (req, res) => {
  const courseId = req.params.id;
  const courseRatings = ratings[courseId];

  if (!courseRatings || courseRatings.length === 0) {
    return res.status(404).send('No ratings found for this course');
  }

  const averageRating = courseRatings.reduce((a, b) => a + b, 0) / courseRatings.length;
  res.json({ averageRating });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
