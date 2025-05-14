const Section = require('../models/Section');

// Lấy danh sách tất cả các section, có thể lọc theo course_id
exports.getAllSections = async (req, res) => {
    try {
        const filter = {};
        if (req.query.course_id) {
            filter.course_id = req.query.course_id;
        }
        const sections = await Section.find(filter).populate('course_id', 'title');
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách section', error: error.message });
    }
};

// Lấy một section theo ID
exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).populate('course_id', 'title');
        if (!section) {
            return res.status(404).json({ message: 'Không tìm thấy section' });
        }
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin section', error: error.message });
    }
};

// Tạo một section mới
exports.createSection = async (req, res) => {
    try {
        const newSection = new Section(req.body);
        await newSection.save();
        res.status(201).json({ message: 'Đã tạo section thành công', section: newSection });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo section', error: error.message });
    }
};

// Cập nhật một section theo ID
exports.updateSection = async (req, res) => {
    try {
        const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSection) {
            return res.status(404).json({ message: 'Không tìm thấy section để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật section thành công', section: updatedSection });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật section', error: error.message });
    }
};

// Xóa một section theo ID
exports.deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);
        if (!deletedSection) {
            return res.status(404).json({ message: 'Không tìm thấy section để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa section thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa section', error: error.message });
    }
};
