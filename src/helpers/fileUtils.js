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
