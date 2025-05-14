const Video = require('../models/Video');

// Lấy danh sách tất cả video (có thể lọc theo lesson_id)
exports.getAllVideos = async (req, res) => {
    try {
        const filter = req.query.lesson_id ? { lesson_id: req.query.lesson_id } : {};
        const videos = await Video.find(filter).populate('lesson_id', 'title'); // Populate thông tin lesson
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách video', error: error.message });
    }
};

// Lấy một video theo ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('lesson_id', 'title');
        if (!video) {
            return res.status(404).json({ message: 'Không tìm thấy video' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin video', error: error.message });
    }
};

// Tạo một video mới
exports.createVideo = async (req, res) => {
    try {
        const newVideo = new Video(req.body);
        await newVideo.save();
        res.status(201).json({ message: 'Đã tạo video thành công', video: newVideo });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo video', error: error.message });
    }
};

// Cập nhật một video theo ID
exports.updateVideo = async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Không tìm thấy video để cập nhật' });
        }
        res.status(200).json({ message: 'Đã cập nhật video thành công', video: updatedVideo });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật video', error: error.message });
    }
};

// Xóa một video theo ID
exports.deleteVideo = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Không tìm thấy video để xóa' });
        }
        res.status(200).json({ message: 'Đã xóa video thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa video', error: error.message });
    }
};