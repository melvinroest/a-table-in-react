import styles from "./UploadPage.module.scss";
import { Upload } from 'react-feather';

function UploadPage() {
  return (
    <div id="UploadComponent">
      <div className={styles.uploadCenter} >
        <Upload color="black" size={128} />
      </div>
      <p className={styles.uploadCenter}>
        Upload CSV
      </p>
    </div>
  );
} 

export default UploadPage;
