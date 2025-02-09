import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFilePdf,
  faFileImage,
  faSearch,
  faSort,
  faUpload,
  faEllipsisV,faCheckCircle,faShareAlt,faShareSquare   

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
<<<<<<< Updated upstream
import CircularProgress from "@mui/material/CircularProgress";

=======
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
>>>>>>> Stashed changes
const UserDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [selectedDocumentName, setSelectedDocumentName] = useState("");
<<<<<<< Updated upstream
  const [isSharing, setIsSharing] = useState(false);

  // Get user information from localStorage
  const name = localStorage.getItem("name");
  const useremail = localStorage.getItem("email");
=======
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareInfoDialogOpen, setShareInfoDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [sharedDocInfo, setSharedDocInfo] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isUpgradePopupOpen, setIsUpgradePopupOpen] = useState(false)


  //  var name = "Ashwini Patil";
  //  var useremail = "patilash8698@gmail.com";
  // Fetch documents from the database on component mount
  var name = localStorage.getItem('name');
  var useremail = localStorage.getItem('email');
>>>>>>> Stashed changes

  useEffect(() => {
    fetchDocuments();
  }, []);
  useEffect(() => {
    // Fetch isPremiumUser status from localStorage when component mounts
    const premiumStatus = localStorage.getItem("isPremiumUser") === "true";
    setIsPremiumUser(premiumStatus);
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
  const handleMenuClick = (e, doc) => {
    setAnchorEl(e.currentTarget);  // Set the anchor to the clicked icon
    setSelectedDoc(doc);  // Set the selected document
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);  // Close the menu by setting anchorEl to null
    setSelectedDoc(null);  // Reset selectedDoc
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
<<<<<<< Updated upstream

    return fileTypeMap[mimeType] || mimeType.toUpperCase();
=======
    
    return fileTypeMap[mimeType] || mimeType.toUpperCase();  // Default fallback
};

const handleUpgradeClose = () => setIsUpgradePopupOpen(false);

  // Call the handlePayment function when user clicks upgrade button
  const handleUpgradeClick = () => {
    setIsUpgradePopupOpen(false); // Close the popup
    handlePayment(); // Trigger the handlePayment function
>>>>>>> Stashed changes
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
    const isPremiumUser = localStorage.getItem("isPremiumUser") === "true";

    if (!isPremiumUser && file.size > 2 * 1024 * 1024) {
      // Show upgrade popup if file size exceeds 2MB
      setIsUpgradePopupOpen(true);
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
<<<<<<< Updated upstream
  };
=======
};

const handleDownload = async (docId) => {
  const token = localStorage.getItem("token"); 
  const fileUrl = `http://localhost:8080/api/document/download/${docId}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(fileUrl, { headers });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = docId; // You can customize the filename here
    
    link.click();
    window.URL.revokeObjectURL(url); // Clean up the URL object
  } catch (error) {
    console.error('Error downloading document:', error);
  }
};
>>>>>>> Stashed changes

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
  const handleViewShareInfo = (doc) => {
    // Show sharing info dialog when document is shared
    setSharedDocInfo({
      sharedBy: doc.sharedBy,
      sharedAt: doc.sharedAt,
    });
    setShareInfoDialogOpen(true);
  };

<<<<<<< Updated upstream
=======
  const handleCloseShareInfoDialog = () => {
    setShareInfoDialogOpen(false);
    setSharedDocInfo(null);
  };
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token"); // Get auth token for backend
  
      // Call your backend to create an order
      const response = await axios.post(
        "http://localhost:8080/api/payment/createOrder",
        { amount: 50000 }, // ₹500 in paise
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Attach JWT token for Spring Security
          },
        }
      );
  
      if (!response.data.orderId) {
        alert("Failed to create order");
        return;
      }
  
      // Razorpay options
      const options = {
        key: "rzp_test_u768hLGUYuYgrN", // Your Razorpay Test Key
        amount: 500, // Amount in paise
        currency: "INR",
        name: "Trust Vault",
        description: "Upgrade to Premium",
        order_id: response.data.orderId, // Get from backend
        handler: function (response) {
          alert("Payment Successful: " + response.razorpay_payment_id);
          localStorage.setItem("isPremiumUser", "true");
        },
        prefill: {
          name: "Ashwini Patil",
          email: "patilash8698@gmail.com",
          contact: "9209261414",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed! Check console for details.");
    }
  };

>>>>>>> Stashed changes
  return (
    <div className="user-dashboard-container">
      <NavigationBar2 />
      <header className="user-dashboard-header">
        <h1>User Dashboard</h1>
        <p>Manage your documents securely.</p>
      </header>
  
      <main className="user-dashboard-main">
        {/* Upload Section */}
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
  
        {/* Search and Sort Section */}
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
  
        {/* File List Section */}
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
                    <td>
                      {doc.name}
                      {doc.isShared && (
                        <FontAwesomeIcon
                          icon={faShareSquare}
                          className="shared-icon"
                          title="Shared with you"
                          style={{ marginLeft: '90px' }}
                          onClick={() => handleViewShareInfo(doc)}
                        />
                      )}
                    </td>
                    <td>{formatDate(doc.uploadedAt)}</td>
                    <td>
                      <FontAwesomeIcon icon={getFileIcon(doc.type)} />{" "}
                      {formatFileType(doc.type)}
                    </td>
                    <td>{formatFileSize(doc.size)}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className="action-icon"
                        onClick={(e) => handleMenuClick(e, doc)}
                      />
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedDoc === doc}
                        onClose={handleMenuClose}
                      >
<<<<<<< Updated upstream
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
=======
                        <MenuItem onClick={() => handlePreview(doc)}>Preview</MenuItem>
                        {/* Add the download option */}
                        <MenuItem onClick={() => handleDownload(doc.id)}>Download</MenuItem>
                        {!doc.shared && [
                          <MenuItem key="share" onClick={() => handleOpenSharePopup(doc.id, doc.name)}>Share</MenuItem>,
                          <MenuItem key="delete" onClick={() => deleteDocument(doc.id)}>Delete</MenuItem>
                        ]}
                      </Menu>
>>>>>>> Stashed changes
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
<<<<<<< Updated upstream

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
=======
  
      {/* Share Document Popup */}
      <Dialog open={isSharePopupOpen} onClose={handleCloseSharePopup}>
        <DialogTitle>Share Document</DialogTitle>
        <DialogContent>
>>>>>>> Stashed changes
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            error={!!emailError}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
<<<<<<< Updated upstream
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
=======
          <Button onClick={handleCloseSharePopup}>Cancel</Button>
          <Button onClick={handleShareDocument} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
  
  
      <Dialog open={isUpgradePopupOpen} onClose={handleUpgradeClose}>
        <DialogTitle>Upgrade to Premium</DialogTitle>
        <DialogContent>
          <p>File size exceeds 2MB. Upgrade to Premium to upload larger files!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpgradeClose}>Cancel</Button>
          <Button onClick={handleUpgradeClick} color="primary">Upgrade to Premium</Button>
        </DialogActions>
      </Dialog>
  
  
      {/* Share Document Info Dialog */}
      <Dialog open={shareInfoDialogOpen} onClose={handleCloseShareInfoDialog}>
        <DialogTitle>Shared Document Info</DialogTitle>
        <DialogContent>
          <p><strong>Shared By:</strong> {sharedDocInfo?.sharedBy}</p>
          <p><strong>Shared At:</strong> {formatDate(sharedDocInfo?.sharedAt)}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareInfoDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  };
  
  export default UserDashboard;
>>>>>>> Stashed changes
