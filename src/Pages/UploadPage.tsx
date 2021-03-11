import styles from "./UploadPage.module.scss";
import React, { useCallback } from 'react'

import { Upload } from 'react-feather';
import { FileWithPath, useDropzone } from 'react-dropzone'
import classnames from 'classnames';
import axios from "axios";
import { arrayBufferToBase64 } from "../private/stringTransform";

function UploadPage() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: FileWithPath) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryVal = reader.result as ArrayBuffer;
        if (binaryVal) {
          const base64Csv = arrayBufferToBase64(binaryVal);
          axios({
            method: 'POST',
            url: '/api/useranalytics/upload/',
            data: {
              base64Csv: base64Csv
            }
          });
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
      <div {...getRootProps({className: allClassNames})}>
        <input {...getInputProps()} />
        <Upload color="black" size={128} />
        <p>Upload CSV</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}

// function UploadPage() {
//   return (
//     <div id="UploadComponent">
//       <div className={styles.uploadCenter} >
//         <Upload color="black" size={128} />
//       </div>
//       <p className={styles.uploadCenter}>
//         Upload CSV
//       </p>
//     </div>
//   );
// } 

export default UploadPage;
