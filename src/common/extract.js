import JSZip from "jszip";
import gitignorer from "gitignore-parser";

// eslint-disable-next-line import/no-webpack-loader-syntax
import test from "!base64-loader!../_fixtures/test1.zip";

// see https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

var new_zip = new JSZip();

async function extract(b64data) {
  const data = b64toBlob(b64data);
  const e = await JSZip.loadAsync(data);
  console.log({ e });
}

extract(test);
