const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path")

// needed for heroku
const PORT = process.env.PORT || 3001;

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// // returns homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// returns note page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// returns previous notes
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const newData = JSON.parse(data)
        res.json(newData)
    })
})


// POST request to add a new note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
      // Obtain existing reviews
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
          // Add a new review
          parsedNotes.push(newNote);
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
      const response = {
        status: 'success',
      };
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    
    console.log(req.body)
    // returns {}

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const newData = JSON.parse(data)
        // res.json(newData)
       
        console.log(newData)
    })
})
 




// returns the homepage
  app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);





// pseudo server
  app.listen(PORT, () => 
    console.log(`http://localhost:${PORT}`)
  )