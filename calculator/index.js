const express = require('express');
const path = require('path');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 8080; 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Setup Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to parse query params and log requests
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

// Utility to validate numbers
const validateNumbers = (num1, num2, res) => {
  if (isNaN(num1) || isNaN(num2)) {
    const error = 'Invalid input: num1 and num2 must be valid numbers.';
    logger.error(error);
    res.status(400).json({ error });
    return false;
  }
  return true;
};

// Addition
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) + parseFloat(num2);
  logger.info(`Addition: ${num1} + ${num2} = ${result}`);
  res.json({ result });
});

// Subtraction
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) - parseFloat(num2);
  logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
  res.json({ result });
});

// Multiplication
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  const result = parseFloat(num1) * parseFloat(num2);
  logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
  res.json({ result });
});

// Division
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (!validateNumbers(num1, num2, res)) return;
  if (parseFloat(num2) === 0) {
    const error = 'Division by zero is not allowed.';
    logger.error(error);
    res.status(400).json({ error });
    return;
  }
  const result = parseFloat(num1) / parseFloat(num2);
  logger.info(`Division: ${num1} / ${num2} = ${result}`);
  res.json({ result });
});

// Exponentiation (num1 ^ num2)
app.get('/power', (req, res) => {
    const { num1, num2 } = req.query;
    if (!validateNumbers(num1, num2, res)) return;
    const result = Math.pow(parseFloat(num1), parseFloat(num2));
    logger.info(`Exponentiation: ${num1} ^ ${num2} = ${result}`);
    res.json({ result });
});
  
// Square Root (√num1)
app.get('/sqrt', (req, res) => {
    const { num1 } = req.query;
    if (isNaN(num1)) {
      const error = 'Invalid input: num1 must be a valid number.';
      logger.error(error);
      res.status(400).json({ error });
      return;
    }
    if (parseFloat(num1) < 0) {
      const error = 'Square root of negative numbers is not supported.';
      logger.error(error);
      res.status(400).json({ error });
      return;
    }
    const result = Math.sqrt(parseFloat(num1));
    logger.info(`Square Root: √${num1} = ${result}`);
    res.json({ result });
});
  
// Modulo (num1 % num2)
app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query;
    if (!validateNumbers(num1, num2, res)) return;
    const result = parseFloat(num1) % parseFloat(num2);
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
    res.json({ result });
});

// Start the server (This is the only app.listen() call needed)
app.listen(port, () => {
  console.log(`Calculator microservice is running at http://localhost:${port}`);
});
