
const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/', (request, response) =>{

    response.send("Hello from express js");
})


app.get('/api/students', (req, res) =>{
    db.getDbStudents()
     .then(students =>{
        res.send(students);
     })
});


//Create data- POST 

app.post('/api/students', (req, res) =>{
    const student = req.body;
    db.getDbStudents()
        .then(students =>{
            students.push(student);
            db.insertDbStudent(students)
              .then(data =>{
                res.send(student);
              })
        })
})
 

//READ dada- GET
app.get('/api/students/:id', (req, res) =>{

    const id = parseInt(req.params.id);
    db.getDbStudents()
     .then(students => {

        const student = students.find(s => s.id === id);

        if (!student) res.status(404).send("No student found with this id!");

        else res.send(student);
     })
})

//Update data- PUT
app.put('/api/students/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getDbStudents()
     .then(students => {

        const student = students.find(s => s.id === id);

        if (!student) res.status(404).send("No student found with this id!");

        else {
            const i = students.findIndex(s => s.id === id);
            students[i] = updatedData;
            db.insertDbStudent(students)
             .then(msg => res.send(updatedData));
        }
     })

})

//Delete data- delete
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.getDbStudents()
     .then(students => {

        const student = students.find(s => s.id === id);

        if (!student) res.status(404).send("No student found with this id!");

        const updatedStudents = students.filter(s => s.id !== id);
        db.insertDbStudent(updatedStudents)
         .then(msg => res.send(student));
     })
})



const port = 3000;
app.listen(port, () =>{
    console.log(`Lestening on port ${port}.....`)
})


