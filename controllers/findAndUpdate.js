// postController.js
const adPost = require('../models/adminPost')

// ฟังก์ชันสำหรับแก้ไขข้อมูล Post
exports.updatePost = async (req, res) => {
  try {
    const { id, title, content } = req.body;  // รับข้อมูลที่ต้องการแก้ไขจาก body

    // ใช้ findOneAndUpdate เพื่อค้นหาข้อมูลและอัปเดต
    const updatedPost = await adPost.findOneAndUpdate(
      { _id: id },  // ค้นหา Post ที่มี _id ตรงกับ id ที่รับมา
      { title, content },  // ข้อมูลที่ต้องการอัปเดต
      { new: true }  // คืนค่าผลลัพธ์เป็นข้อมูลที่อัปเดตแล้ว
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
