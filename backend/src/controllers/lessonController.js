const Lesson = require('../models/Lesson');


exports.getAllLessons = async (req, res) => {
    try {
        const filter = req.query.section_id ? { section_id: req.query.section_id } : {};
        const lessons = await Lesson.find(filter).populate('section_id', 'title'); 
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài học', error: error.message });
    }
};


exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('section_id', 'title');
        if (!lesson) {
            return res.status(404).json({ message: 'Không tìm thấy bài học' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin bài học', error: error.message });
    }
};


exports.createLesson = async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        await newLesson.save();
        res.status(201).json({ message: 'Đã tạo bài học thành công', lesson: newLesson });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo bài học', error: error.message });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLesson) {
            return res.status(404).json({ message: 'Không tìm thấy bài học để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật bài học thành công', lesson: updatedLesson });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài học', error: error.message });
    }
};


exports.deleteLesson = async (req, res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!deletedLesson) {
            return res.status(404).json({ message: 'Không tìm thấy bài học để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa bài học thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa bài học', error: error.message });
    }
};