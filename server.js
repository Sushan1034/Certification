const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        // If no date is provided, use the current date
        date = new Date();
    } else {
        // If the date parameter is numeric (Unix timestamp)
        if (!isNaN(dateParam)) {
            date = new Date(parseInt(dateParam));
        } else {
            // Otherwise, treat it as a date string
            date = new Date(dateParam);
        }
    }

    // Validate the date
    if (isNaN(date.getTime())) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString(),
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running properly on port 3000.");
});
