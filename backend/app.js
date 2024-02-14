const express = require('express');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const claimRoutes = require('./routes/claimRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const accessRoutes = require('./routes/accessRoutes');
const connectDB = require('./config/db');
const cors = require('cors')
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");

connectDB();

// Apply middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors());
app.use(errorMiddleware)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/access', accessRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});