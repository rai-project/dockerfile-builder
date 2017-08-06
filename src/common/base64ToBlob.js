import filetype from "../thirdparty/filetype";

// see https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
export default function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  if (contentType === "") {
    contentType = filetype(byteCharacters) || "plain/text";
  }

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
