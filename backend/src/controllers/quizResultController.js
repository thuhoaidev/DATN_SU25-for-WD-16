const QuizResult = require('../models/QuizResult');

// Lấy danh sách tất cả kết quả quiz (có thể lọc theo user_id hoặc quiz_id)
exports.getAllQuizResults = async (req, res) => {
    try {
        const filter = {};
        if (req.query.user_id) filter.user_id = req.query.user_id;
        if (req.query.quiz_id) filter.quiz_id = req.query.quiz_id;
        const quizResults = await QuizResult.find(filter)
            .populate('user_id', 'name email') 
            .populate('quiz_id', 'question'); 
        res.status(200).json(quizResults);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách kết quả quiz', error: error.message });
    }
};

// Lấy một kết quả quiz theo ID
exports.getQuizResultById = async (req, res) => {
    try {
        const quizResult = await QuizResult.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('quiz_id', 'question');
        if (!quizResult) {
            return res.status(404).json({ message: 'Không tìm thấy kết quả quiz' });
        }
        res.status(200).json(quizResult);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin kết quả quiz', error: error.message });
    }
};

// Tạo một kết quả quiz mới (khi người dùng nộp bài)
exports.createQuizResult = async (req, res) => {
    try {
        const newQuizResult = new QuizResult(req.body);
        await newQuizResult.save();
        res.status(201).json({ message: 'Đã lưu kết quả quiz thành công', quizResult: newQuizResult });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lưu kết quả quiz', error: error.message });
    }
};

// (Có thể không cần cập nhật hoặc xóa kết quả quiz sau khi đã nộp)
// exports.updateQuizResult = async (req, res) => { ... };
// exports.deleteQuizResult = async (req, res) => { ... };