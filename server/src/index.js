const express = require('express');
const cors = require('cors');
const connectDB = require('./models/db');

const authRouter = require('./router/auth-routes');
const itemsRouter = require('./router/items-routes');
const cartRouter = require('./router/cart-routes');
const likesRouter = require('./router/likes-routes');
const checkoutRoutes = require('./router/checkout-routes');
const orderRoutes = require('./router/order-routes');
const adminRouter = require('./router/admin-routes');
const userRouter = require('./router/user-routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const status = 'ok';
  const response = { message: `Nook's Cranny API is running` };

  res.json({
    status: status,
    response: response
  });
});

app.get('/api/categories', async (req, res) => {
  try {
    const pool = await connectDB();
    const [results] = await pool.query('SELECT DISTINCT category FROM items');
    const categories = results.map(result => result.category);
    res.json({ categories });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database query error' });
  }
});

app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/likes', likesRouter);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});