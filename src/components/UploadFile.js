import { useState } from 'react';
import { postFile } from '../api/apiFile';
import { toast } from 'react-toastify';

function UploadFile({ handleImageUpload }) {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('이미지를 업로드해주세요');
  const [previews, setPreviews] = useState([]);

  const imageSelectHandler = async e => {
    const imageFiles = e.target.files;

    if (imageFiles.length > 0) {
      setFiles(imageFiles);
      setFileName(imageFiles[0].name);
    } else {
      setFiles(null);
      setFileName('이미지를 업로드하세요');
    }

    const imagePreviews = await Promise.all(
      [...imageFiles].map(async imageFile => {
        return new Promise((resolve, reject) => {
          try {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onload = e => resolve({ imgSrc: e.target.result, fileName: imageFile.name });
          } catch (err) {
            reject(err);
          }
        });
      }),
    );

    setPreviews(imagePreviews);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('image', file);

    for (let file of files) formData.append('images', file);

    const title = document.getElementById('title').value;
    formData.append('title', title);

    try {
      const res = await postFile(formData);
      console.log(res);
      handleImageUpload();
      toast.success('이미지 업로드 성공');
    } catch (error) {
      alert('이미지 업로드 실패');
    }
  };

  const previewImages = previews.map((preview, i) => (
    <div key={i}>
      <div>
        <img src={preview.imgSrc} alt="" style={{ width: 200, height: 200, objectFit: 'cover' }} />
        <p>{preview.fileName}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div style={{ display: 'flex', gap: 10 }}>{previewImages}</div>
      <form onSubmit={onSubmit}>
        <div className="fileView">
          {fileName}
          <input type="file" name="image" id="inp" multiple onChange={imageSelectHandler} accept="image/*" />
        </div>
        <input type="text" name="title" id="title" />
        <button type="submit">파일전송</button>
      </form>
    </>
  );
}

export default UploadFile;
