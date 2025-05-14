const Quiz = require('../models/Quiz');

// Lấy danh sách tất cả quiz (có thể lọc theo lesson_id)
exports.getAllQuizzes = async (req, res) => {
    try {
        const filter = req.query.lesson_id ? { lesson_id: req.query.lesson_id } : {};
        const quizzes = await Quiz.find(filter).populate('lesson_id', 'title'); 
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách quiz', error: error.message });
    }
};

// Lấy một quiz theo ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('lesson_id', 'title');
        if (!quiz) {
            return res.status(404).json({ message: 'Không tìm thấy quiz' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin quiz', error: error.message });
    }
};

// Tạo một quiz mới
exports.createQuiz = async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).json({ message: 'Đã tạo quiz thành công', quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo quiz', error: error.message });
    }
};

// Cập nhật một quiz theo ID
exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Không tìm thấy quiz để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật quiz thành công', quiz: updatedQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật quiz', error: error.message });
    }
};

// Xóa một quiz theo ID
exports.deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Không tìm thấy quiz để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa quiz thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa quiz', error: error.message });
    }
};