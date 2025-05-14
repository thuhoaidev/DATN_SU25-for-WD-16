const UserExperience = require('../models/UserExperience');

// Lấy điểm kinh nghiệm của tất cả người dùng
exports.getAllUserExperiences = async (req, res) => {
    try {
        const userExperiences = await UserExperience.find().populate('user_id', 'name email');
        res.status(200).json(userExperiences);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy điểm kinh nghiệm của người dùng', error: error.message });
    }
};

// Lấy điểm kinh nghiệm của một người dùng theo ID
exports.getUserExperienceByUserId = async (req, res) => {
    try {
        const userExperience = await UserExperience.findOne({ user_id: req.params.userId })
            .populate('user_id', 'name email');
        if (!userExperience) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin điểm kinh nghiệm của người dùng' });
        }
        res.status(200).json(userExperience);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin điểm kinh nghiệm của người dùng', error: error.message });
    }
};

// Tạo hoặc cập nhật điểm kinh nghiệm của người dùng
exports.updateUserExperience = async (req, res) => {
    try {
        // Tìm bản ghi theo user_id
        let userExperience = await UserExperience.findOne({ user_id: req.params.userId });

        if (!userExperience) {
            // Nếu không tồn tại, tạo mới
            userExperience = new UserExperience({
                user_id: req.params.userId,
                experience_points: req.body.experience_points,
            });
            await userExperience.save();
            res.status(201).json({ message: 'Đã tạo điểm kinh nghiệm cho người dùng', userExperience });
        } else {
            // Nếu tồn tại, cập nhật
            userExperience.experience_points = req.body.experience_points;
            userExperience.updated_at = Date.now();
            await userExperience.save();
            res.status(200).json({ message: 'Đã cập nhật điểm kinh nghiệm cho người dùng', userExperience });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật điểm kinh nghiệm của người dùng', error: error.message });
    }
};
