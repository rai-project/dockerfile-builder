package server

import (
	"archive/tar"
	"archive/zip"
	"bytes"
	"compress/gzip"
	"io"
	"strings"
)

func zipBytesToTarBz2(dec []byte) ([]byte, error) {

	zipReader, err := zip.NewReader(bytes.NewReader(dec), int64(len(dec)))
	if err != nil {
		return nil, err
	}

	tarBuffer := new(bytes.Buffer)
	tarWriter := tar.NewWriter(tarBuffer)

	for _, file := range zipReader.File {
		fi := file.FileInfo()
		fileName := file.Name

		link := ""

		hdr, err := tar.FileInfoHeader(fi, link)
		if err != nil {
			continue
		}

		if fi.IsDir() && !strings.HasSuffix(fileName, "/") {
			fileName = fileName + "/"

		}

		if err := tarWriter.WriteHeader(hdr); err != nil {
			return nil, err
		}

		if hdr.Typeflag != tar.TypeReg {
			continue
		}

		rc, err := file.Open()
		if err != nil {
			return nil, err
		}

		buf := new(bytes.Buffer)
		if _, err := io.Copy(buf, rc); err != nil {
			rc.Close()
			return nil, err
		}
		rc.Close()

		if _, err := tarWriter.Write(buf.Bytes()); err != nil {
			return nil, err
		}
	}
	if err := tarWriter.Close(); err != nil {
		return nil, err
	}

	gzipBuffer := new(bytes.Buffer)
	gzipWriter := gzip.NewWriter(gzipBuffer)
	if _, err := gzipWriter.Write(tarBuffer.Bytes()); err != nil {
		return nil, err
	}
	if err := gzipWriter.Close(); err != nil {
		return nil, err
	}
	return gzipBuffer.Bytes(), nil
}
