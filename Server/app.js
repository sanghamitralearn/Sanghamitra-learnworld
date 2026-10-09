const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dns = require('dns');
const User = require('./model/userSchema');
const authRouter = require('./router/auth');
const mathRouter = require('./router/math');
const examsRouter = require('./router/exams');
const adminRouter = require('./router/admin');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Load environment variables
dotenv.config({ path: './.env' });

// Vercel terminates HTTPS and forwards over HTTP internally; without this,
// Express never sees the connection as secure, so a secure session cookie
// is silently never set.
if (process.env.VERCEL) {
    app.set('trust proxy', 1);
}

// Middleware setup
app.use(cors({
    origin: ['http://127.0.0.1:5500','https://sanghamitra-learnworld-mu.vercel.app','https://sanghamitralearning.vercel.app'], // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB once and share that client with the session store. A failed attempt
// (e.g. the router's DNS refusing the mongodb+srv lookup) is retried instead of crashing.
const SRV_FALLBACK_DNS = ['8.8.8.8', '1.1.1.1'];
const mongoReady = (async function connectWithRetry(attempt = 1) {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to MongoDB");
        return mongoose.connection.getClient();
    } catch (err) {
        console.error(`MongoDB connection failed (attempt ${attempt}): ${err.code || ''} ${err.message}`);
        if (err.syscall === 'querySrv' && !dns.getServers().includes(SRV_FALLBACK_DNS[0])) {
            console.log(`DNS lookup refused; retrying with ${SRV_FALLBACK_DNS.join(', ')}`);
            dns.setServers([...SRV_FALLBACK_DNS, ...dns.getServers()]);
        }
        await new Promise((resolve) => setTimeout(resolve, Math.min(attempt, 6) * 2000));
        return connectWithRetry(attempt + 1);
    }
})();

app.use(session({
    name: 'sessionId',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        clientPromise: mongoReady,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day, you can customize this
        ...(process.env.VERCEL ? { sameSite: 'none', secure: true } : {})
    }
}));


// Routes
app.use('/api', authRouter);
app.use('/api/math', mathRouter);
app.use('/api/exams', examsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Example route setting a cookie
app.get('/api/example', function(req, res) {
    res.cookie('name', 'tutorialsPoint');
    res.send("Cookies are set");
});

// Start server (skip listen() under Vercel's serverless runtime)
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
