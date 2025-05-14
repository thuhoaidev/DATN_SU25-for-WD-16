const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('category_id', 'name').populate('created_by', 'name email');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học', error: error.message });
    }
};


exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('category_id', 'name').populate('created_by', 'name email');
        if (!course) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin khóa học', error: error.message });
    }
};


exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ message: 'Đã tạo khóa học thành công', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo khóa học', error: error.message });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật khóa học thành công', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật khóa học', error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa khóa học thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa khóa học', error: error.message });
    }
};