package server

import (
	"archive/tar"
	"archive/zip"
	"bytes"
	"compress/gzip"
	"io"
)

func zipBytesToTarBz2(dec []byte) ([]byte, error) {

	zipReader, err := zip.NewReader(bytes.NewReader(dec), int64(len(dec)))
	if err != nil {
		return nil, err
	}

	tarBuffer := new(bytes.Buffer)
	tarWriter := tar.NewWriter(tarBuffer)

	for _, file := range zipReader.File {
		if file.FileInfo().IsDir() {
			continue
		}
		rc, err := file.Open()
		if err != nil {
			return nil, err
		}
		buf := new(bytes.Buffer)
		written, err := io.Copy(buf, rc)
		if err != nil {
			return nil, err
		}
		rc.Close()
		hdr := &tar.Header{
			Name: file.Name,
			Mode: 0600,
			Size: written,
		}
		if err := tarWriter.WriteHeader(hdr); err != nil {
			return nil, err
		}
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
