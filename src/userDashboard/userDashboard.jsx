import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFilePdf,
  faFileImage,
  faSearch,
  faSort,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashboard.css";
import NavigationBar2 from "../components/NavigationBar2";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const UserDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [selectedDocumentName, setSelectedDocumentName] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  // Get user information from localStorage
  const name = localStorage.getItem("name");
  const useremail = localStorage.getItem("email");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      alert("You are not authorized. Please log in again.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/document/getAllDocument`,
        {
          params: { uploadedBy: name, uploaderEmail: useremail },
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      console.log(response.data);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      alert("Failed to fetch documents. Please try again later.");
    }
  };

  const formatFileType = (mimeType) => {
    const fileTypeMap = {
      "application/pdf": "PDF",
      "application/msword": "DOC",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
      "application/vnd.ms-excel": "XLS",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
      "text/plain": "TXT",
      "image/png": "PNG",
      "image/jpeg": "JPG",
      "image/jpg": "JPG",
      "image/gif": "GIF",
      "image/svg+xml": "SVG",
      "application/zip": "ZIP",
      "application/x-rar-compressed": "RAR",
    };

    return fileTypeMap[mimeType] || mimeType.toUpperCase();
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (file.type.startsWith("video/")) {
      alert("Video files are not allowed!");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size cannot be larger than 2MB!");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", name);
    formData.append("uploaderEmail", useremail);

    const authToken = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/api/document/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${authToken}`
        },
      });
      fetchDocuments(); // Refresh documents after upload
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }

    event.target.value = "";
  };

  // Preview file
  const handlePreview = async (doc) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      alert("You are not authorized. Please log in again.");
      return;
    }
    try {
      const fileUrl = `http://localhost:8080/api/document/download/${doc.id}`;
      const previewWindow = window.open("", "_blank");

      if (!previewWindow) {
        alert("Please allow pop-ups to preview the document.");
        return;
      }

      previewWindow.document.write(`<h1>${doc.name}</h1>`);

      // Added Authorization header in the fetch request
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${authToken}` // Sending JWT token
        }
      });

      if (!response.ok) { 
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      if (doc.type === "text/plain") {
        const text = await response.text();
        previewWindow.document.write(`<pre>${text}</pre>`);
      } else if (doc.type === "application/pdf") {
        const blob = await response.blob();  
        const blobUrl = URL.createObjectURL(blob);
        previewWindow.document.write(
          `<embed src="${blobUrl}" width="100%" height="600px" type="application/pdf" />`
        );
      } else if (doc.type.startsWith("image/")) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        previewWindow.document.write(
          `<img src="${blobUrl}" alt="${doc.name}" width="50%" height="auto"/>`
        );
      } 
      // Check for Word and Excel file types
      else if (
        doc.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
        doc.type === "application/msword" || // .doc
        doc.type === "application/vnd.ms-excel" || // .xls
        doc.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
      ) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        previewWindow.document.write(`
          <p>Preview is not available for this file type. You can download the document using the link below:</p>
          <a href="${blobUrl}" download="${doc.name}" style="padding:10px; background:#007BFF; color:white; text-decoration:none; border-radius:5px;">Download File</a>
        `);
      } else {
        previewWindow.document.write("<p>Preview not available for this file type.</p>");
      }
    } catch (error) {
      console.error("Error previewing file:", error);
      alert("Failed to preview file.");
    }
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedDocuments = [...documents].sort((a, b) => {
      const dateA = new Date(a.uploadedAt);
      const dateB = new Date(b.uploadedAt);

      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }

      return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setDocuments(sortedDocuments);
    setSortOrder(newSortOrder);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return faFilePdf;
      case "txt":
        return faFileAlt;
      case "jpg":
      case "png":
      case "jpeg":
        return faFileImage;
      default:
        return faFileAlt;
    }
  };

  // Format the date correctly
  const formatDate = (dateString) => {
    if (!dateString) {
      console.error("Invalid or missing date:", dateString);
      return "Invalid Date";
    }

    const sanitizedDate = dateString.split(".")[0];
    const date = new Date(sanitizedDate);

    if (isNaN(date)) {
      console.error("Invalid date format:", dateString);
      return "Invalid Date";
    }

    return date.toLocaleString();
  };

  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleOpenSharePopup = (docId, docName) => {
    setSelectedDocumentId(docId);
    setSelectedDocumentName(docName);
    setIsSharePopupOpen(true);
  };

  const handleCloseSharePopup = () => {
    setIsSharePopupOpen(false);
    setEmail("");
    setEmailError("");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
  };

  // Delete document
  const deleteDocument = async (docId) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      alert("You are not authorized. Please log in again.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this document?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/document/deleteDocument/${docId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      // Remove the deleted document from state
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== docId));
  
      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };
  
  const handleShareDocument = async () => {
    if (!email || emailError) {
      alert("Please enter a valid email address.");
      return;
    }
    // Start the loader
    setIsSharing(true);
  
    const authToken = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8080/api/document/share`,
        {
          documentId: selectedDocumentId,
          sharedWith: email,
          documentName: selectedDocumentName,
          sharedBy: name,
          sharedAt: "2024-12-08T10:00:00",
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          contentType: "application/json",
        }
      );
      alert("Document shared successfully!");
      handleCloseSharePopup();
    } catch (error) {
      console.error("Error sharing document:", error);
      alert("Failed to share document. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="user-dashboard-container">
      <NavigationBar2 />
      <header className="user-dashboard-header">
        <h1>User Dashboard</h1>
        <p>Manage your documents securely.</p>
      </header>

      <main className="user-dashboard-main">
        <section className="user-dashboard-upload-section">
          <label className="upload-button">
            <FontAwesomeIcon icon={faUpload} />
            <span>Upload File</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="upload-input"
            />
          </label>
        </section>

        <section className="user-dashboard-sort-search">
          <div className="search-sort-container">
            <button className="sort-button" onClick={toggleSortOrder}>
              <FontAwesomeIcon icon={faSort} />
              {sortOrder === "asc" ? " Ascending" : " Descending"}
            </button>
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search files by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </section>

        <section className="user-dashboard-file-list">
          {filteredDocuments.length === 0 ? (
            <p>No documents available.</p>
          ) : (
            <table className="file-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Date Uploaded</th>
                  <th>File Type</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{formatDate(doc.uploadedAt)}</td>
                    <td>
                      <FontAwesomeIcon icon={getFileIcon(doc.type)} />{" "}
                      {formatFileType(doc.type)}
                    </td>
                    <td>{formatFileSize(doc.size)}</td>
                    <td>
                      <button
                        className="preview-button"
                        onClick={() => handlePreview(doc)}
                      >
                        Preview
                      </button>
                      {/* Conditionally render Delete and Share buttons */}
                      {!doc.isShared && (
                        <>
                          <button
                            className="delete-button"
                            onClick={() => deleteDocument(doc.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="share-button"
                            onClick={() =>
                              handleOpenSharePopup(doc.id, doc.name)
                            }
                          >
                            Share
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <Dialog
        open={isSharePopupOpen}
        onClose={handleCloseSharePopup}
        PaperProps={{
          style: {
            borderRadius: "12px",
            background: "white",
            color: "black",
          },
        }}
      >
        <DialogTitle>
          <div className="popup-header">Share Document</div>
        </DialogTitle>
        <DialogContent>
          <h6>
            Sharing: <strong>{selectedDocumentName}</strong>
          </h6>
          <h5 style={{ marginBottom: "12px", color: "black" }}>
            Enter email address to share this document
          </h5>
          <TextField
            label="Recipient's Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError || "Enter a valid email address"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSharePopup} className="popup-cancel-button">
            Cancel
          </Button>
          <Button
            onClick={handleShareDocument}
            className="popup-share-button"
            disabled={!!emailError || isSharing}
          >
            {isSharing ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Share"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
