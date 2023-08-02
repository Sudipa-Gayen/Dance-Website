const express=require('express');
const path=require('path');
const port=8000;
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Connect to MongoDB
mongoose.connect('mongodb://localhost/sampleDBcontact', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    no: String,
    email: String,
    address: String,
    concern: String,
});

const Data = mongoose.model('Data', contactSchema);

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static',express.static('static'));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res)=>{
    res.status(200).render('index.pug');
});

app.get('/contact', (req,res)=>{
    res.render('contact');
});

app.post('/save-data', async (req, res) => {
    const { name,no, email,address,concern } = req.body;
  
    // Create a new document using the Mongoose model
    const newData = new Data({ name,no, email,address,concern });
  
    try {
      // Save the document to the MongoDB database
      await newData.save();
      res.send('Data saved successfully!');
    } catch (err) {
      res.status(500).send('Error saving data to the database');
    }
});


app.listen(port,()=>{
    console.log(`The Application Started Sucessfully on port ${port}`);
}); 