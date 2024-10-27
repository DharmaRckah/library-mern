import noticeModel from "../models/noticeModel.js";

// Create Notice Controller
export const createnoticeController = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newnotice = new noticeModel({
      title,
      content,
      admin: userId,
    });

    const notice = await newnotice.save();
    res
      .status(201)
      .send({ message: "Notice created successfully", notice: notice });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
// Manage Notice Controller
export const managenoticeController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await noticeModel.find({ admin: _id });
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
// Delete Notice Controller
export const deletenoticeController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await noticeModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Notice not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Notice deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
// Update Notice Controller
export const updatenoticeController = async (req, res) => {
  try {
    const { title, content } = req.body;

    try {
      const notice = await noticeModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
        },
        { new: true }
      );

      if (!notice) {
        return res.status(404).send({ message: "Notice not found" });
      }

      res
        .status(200)
        .send({ message: "Notice updated successfully", notice: notice });
    } catch (error) {
      res.status(500).send({ error: "Server error", message: error.message });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
