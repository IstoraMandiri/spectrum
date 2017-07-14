import sanitize from 'sanitize-filename';

export function getFileContents(file) {
  // use fileReader to get JSON
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export function downloadJSON(content, fileName) {
  const element = document.createElement('a');
  document.body.appendChild(element);
  element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', sanitize(fileName));
  element.click();
  document.body.removeChild(element);
}

export function imageToDataUri(img, width, height, quality = 0.7) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', quality);
}

export function resizeDataUri(dataUri, width, quality) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // return the original if the image isn't big enough
      const noResize = img.width <= width;
      const targetWidth = noResize ? img.width : width;
      const targetHeight = noResize ? img.height : img.height * (width / img.width);
      return resolve(imageToDataUri(img, targetWidth, targetHeight, quality));
    };
    img.src = dataUri;
  });
}
