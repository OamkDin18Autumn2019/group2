import axios from "axios";
const URL = "http://localhost:4000/v1/uploads/images";
const config = {
  headers: {
    "content-type": "multipart/form-data"
  }
};
const uploadImage = async e => {
  let imageForm = new FormData();
  imageForm.append("imageName", "multer-image-" + Date.now());
  imageForm.append("productImage", e.target.files[0]);
  console.log("selected files", e.target.files);
  try {
    console.log("uploading image...", e.target.files[0]);
    const res = await axios.post(URL, imageForm, config);
    return res.data.filename;
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export { uploadImage };
