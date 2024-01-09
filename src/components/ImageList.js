

function ImageList({ imgData }) {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {imgData.length > 0 ? (
          imgData.map((item, i) => {
            return (
              <div key="i">
                <img src={`${process.env.REACT_APP_DEV_HOST}/file/${item.id}`} alt="" style={{ width: 200 }} />
              </div>
            );
          })
        ) : (
          <p>no image</p>
        )}
      </div>
    </>
  );
}
export default ImageList;
