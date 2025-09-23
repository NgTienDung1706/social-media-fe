import { useState, useEffect } from "react";

function useImageHeight(imgList, containerWidth) {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (Array.isArray(imgList) && imgList.length > 0 && containerWidth > 0) {
      let highest = 0;
      let loaded = 0;

      imgList.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const ratio = img.height / img.width;
          const scaledHeight = ratio * containerWidth;
          highest = Math.max(highest, scaledHeight);
          loaded++;
          if (loaded === imgList.length) {
            setMaxHeight(highest);
          }
        };
        img.onerror = () => {
          loaded++;
          if (loaded === imgList.length) {
            setMaxHeight(highest || containerWidth);
          }
        };
      });
    }
  }, [imgList, containerWidth]);

  return maxHeight;
}

export default useImageHeight;
