// front/src/components/file-upload-form/FileUploadForm.tsx

import { useState, useRef } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { LinkCheckReport, CheckResponse } from "../../types/types";
import { Button } from "../button/Button";
import styles from "./FileUploadForm.module.css";
import axios from "axios";

interface FileUploadFormProps {
  onReportUpload: (report: LinkCheckReport) => void;
}

export const FileUploadForm = ({ onReportUpload }: FileUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Upload file, please");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFilesFormats = ".pdf,.doc,.docx,.txt";

  const uploadAPI = "http://localhost:3000/api/upload";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const data = new FormData();
    data.append("document", file);

    setLoading(true);
    setMessage("File loading...");

    try {
      const response = await axios.post<CheckResponse>(uploadAPI, data);
      setMessage(response.data.message);

      if (response.data.report) {
        onReportUpload(response.data.report);
      }
    } catch (err) {
      setMessage("File uploading error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    if (file) {
      setFile(null);
      setMessage("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit}>
        <div>{message}</div>
        <input
          type="file"
          onChange={handleFileChange}
          accept={allowedFilesFormats}
          style={{ marginBottom: "10px", display: "block" }}
          ref={fileInputRef}
        />
        <div className={styles.formButtons}>
          <Button title={"Upload"} type="submit" disabled={!file || loading} />
          <Button title="Remove" type="button" disabled={!file || loading} onClick={handleRemove} />
        </div>
      </form>
    </div>
  );
};
