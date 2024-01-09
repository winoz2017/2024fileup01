import './App.css';
import { ToastContainer } from 'react-toastify';
import { getFileList } from './api/apiFile';
import 'react-toastify/dist/ReactToastify.css';

import UploadFile from './components/UploadFile';
import ImageList from './components/ImageList';
import { useEffect, useState } from 'react';

function App() {
  const [imgData, setImgData] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [imageUploaded]);

  const fetchData = async () => {
    try {
      const updatedImgList = await getFileList();
      setImgData(updatedImgList);
      setImageUploaded(false);
    } catch (error) {
      console.error('리스트 불러오기 에러dd');
    }
  };

  const handleImageUpload = () => {
    setImageUploaded(true);
  };

  return (
    <div className="App">
      <h2>사진첩입니다11111111ddddd</h2>

      <UploadFile handleImageUpload={handleImageUpload} />
      <ImageList imgData={imgData} />
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
