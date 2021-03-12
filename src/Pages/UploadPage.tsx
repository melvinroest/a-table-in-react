import styles from "./UploadPage.module.scss";
import React, { useCallback } from 'react'

import { Upload } from 'react-feather';
import { FileWithPath, useDropzone } from 'react-dropzone'
import classnames from 'classnames';
import axios, { AxiosResponse } from "axios";
import { arrayBufferToBase64 } from "../private/stringTransform";

import { StatusCodes } from 'http-status-codes';

function UploadPage() {
  const [uploadMessage, setUploadMessage] = React.useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: FileWithPath) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
      // Do whatever you want with the file contents
        const binaryVal = reader.result as ArrayBuffer;
        if (binaryVal) {
          const base64Csv = arrayBufferToBase64(binaryVal);
          let res: AxiosResponse<any>;
          try {
            res = await axios({
              method: 'POST',
              url: '/api/useranalytics/upload/',
              data: {
                base64Csv: base64Csv
              }
            });
          } catch (e) {
            setUploadMessage(e.response.data);
            return;
          }
          if (res!) {  
            if (res.status === StatusCodes.CREATED) {
              setUploadMessage("Upload succeeded!");
            } else {
              setUploadMessage("Something went wrong and there is no error information");
            }
          }
        }
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } = useDropzone({ onDrop });
  const files = acceptedFiles.map((file: FileWithPath) => <li key={file.path}>{file.path}</li>);
  const allClassNames = classnames('dropzone', styles.container, { [styles.activeStyle]: isDragActive }, { [styles.acceptStyle]: isDragAccept }, { [styles.rejectStyle]: isDragReject });

  return (
    <section>
      <h1>Upload CSV</h1>
      <div {...getRootProps({className: allClassNames})}>
        <input {...getInputProps()} />
        <Upload color="black" size={128} />
        <p>Upload CSV</p>
      </div>
      <aside>
        <h4>Files Uploaded</h4>
        <ul>{files}</ul>
        <ul>Upload message: {uploadMessage}</ul>
      </aside>
    </section>
  )
}

export default UploadPage;
