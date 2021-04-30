//load express
const express = require('express')
const app = express()

const port = process.env.PORT || 8200;

//load graphql
const graphqlHTTP = require('express-graphql').graphqlHTTP;

//load schema
const schema = require('./schema/schema');

//load mongoose
const mongoose = require('mongoose')

//database connection
mongoose.connect("mongodb+srv://AcornPurpleSquirrel:c5g83kCRgzjBKqNE@acorn.bzwjn.mongodb.net/assessmentsService", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8200, () => {
    console.log("Server started on: " + port)
  });