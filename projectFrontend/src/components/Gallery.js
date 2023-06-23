import React from "react";

const Gallery = () => {
  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.pixabay.com/photo/2016/09/22/11/55/kitchen-1687121_1280.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.pixabay.com/photo/2022/03/04/10/21/property-7046997_960_720.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src="https://cdn.pixabay.com/photo/2018/07/27/00/32/interior-design-3564955_960_720.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
