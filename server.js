const Joi = require('joi');
var express = require('express');
var app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'aaaa' },
    { id: 2, name: 'bbb' },
    { id: 3, name: 'vcccccc' },
    { id: 4, name: 'ffffff' },
    { id: 5, name: 'ddddd' }
];

app.get('/', function (req, res) {
    res.send('<p>Hello world</p>');
});
app.get('/api/courses', function (req, res) {
    res.send(courses);

});
app.get('/api/courses/:id', function (req, res) {
    res.send(courses);

});
app.post('/api/courses', function (req, res) {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', function (req, res) {
    //look for course id
        //if not exist than return 404

        //else update the course 
    //return the updated course to client.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("id not present");

    //validate
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {

        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update
    course.name = req.body.name;
    //return updated course to client
    res.send(course);



});

app.delete('/api/courses/:id', function (req, res) {

    //look for course id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if Id not exist than show 404
    if (!course) res.status(404).send("id not present");

    //else delete id's data

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);



});



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listning on port: ${port}`);
}
);