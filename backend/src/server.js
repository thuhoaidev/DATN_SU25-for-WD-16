const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const categoryRoutes = require('./routes/category');
const lessonRoutes = require('./routes/lesson');
const videoRoutes = require('./routes/video');
const quizRoutes = require('./routes/quiz');
const quizResultRoutes = require('./routes/quizResult');
const enrollmentRoutes = require('./routes/enrollment');
const certificateRoutes = require('./routes/certificate');
const badgeRoutes = require('./routes/badge');
const userBadgeRoutes = require('./routes/userBadge');
const commentRoutes = require('./routes/comment');
const orderRoutes = require('./routes/order');
const orderItemRoutes = require('./routes/orderItem');
const blogRoutes = require('./routes/blog');
const voucherRoutes = require('./routes/voucher');
const sectionRoutes = require('./routes/section');
const reviewRoutes = require('./routes/review');
const userExperienceRoutes = require('./routes/userExperience');
const dailyCheckinRoutes = require('./routes/dailyCheckin');
const walletRoutes = require('./routes/wallet');
const walletTransactionRoutes = require('./routes/walletTransaction');
const cartRoutes = require('./routes/cart');

dotenv.config({ path: './.env.local' });

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
mongoose.connect(dbUrl)
    .then(() => console.log('Đã kết nối đến MongoDB'))
    .catch(err => console.error('Không thể kết nối đến MongoDB', err));

// Sử dụng các routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-results', quizResultRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/user-badges', userBadgeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/user-experiences', userExperienceRoutes);
app.use('/api/daily-checkins', dailyCheckinRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/wallet-transactions', walletTransactionRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.send('Backend API đang chạy!');
});

app.listen(port, () => {
    console.log(`Server backend đang lắng nghe trên port ${port}`);
});