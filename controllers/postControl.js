// const adPost = require('../models/adminPost')
// // ฟังก์ชันสำหรับการเพิ่มสินค้าใหม่
// module.exports = (req, res) => {
//     adPost.create(req.body).then(() => {
//         console.log("add successfully!")
//         res.redirect('/')

//     }).catch((error) => {
//         console.log(error.errors)
        
//     })
// }
const adPost = require('../models/adminPost')
const User = require('../models/User')
// ฟังก์ชันเพิ่มข้อมูล Post โดยใช้ _id ของ User
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // ตรวจสอบว่า User ที่มี _id นี้มีอยู่ในฐานข้อมูลหรือไม่
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // สร้าง Post ใหม่
    const newPost = new adPost({
      title,
      content,
      admin: user._id,  // เก็บ _id ของ User ไว้ใน Post
    });

    // บันทึก Post ใหม่ในฐานข้อมูล
    await newPost.save();

    return res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};