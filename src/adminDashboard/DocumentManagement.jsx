

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import NavigationBar2 from "../components/NavigationBar2";

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDocument, setEditedDocument] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [newDocument, setNewDocument] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const authtoken = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/api/document",
          {
            headers: {
              "Authorization": `Bearer ${authtoken}`,
            },
          }
        );
        setDocuments(response.data);
      } catch (err) {
        setError("Failed to fetch documents");
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  
  const handleCreateDocument = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:8080/api/document", 
      newDocument,
      {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      }
    );
      setDocuments([...documents, response.data]);
      setNewDocument({ title: "", description: "" });
    } catch (err) {
      setError("Failed to create document");
      console.error("Error creating document:", err);
    }
  };

 
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedDocument(documents[index]);
  };

  
  const handleSaveEdit = async (e) => {
    e.preventDefault(); 

    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/document/${editedDocument.id}`,
        editedDocument,
        {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
        }
      }
      );

     
      const updatedDocuments = [...documents];
      updatedDocuments[editingIndex] = response.data; 
      setDocuments(updatedDocuments);

      setEditingIndex(null); 
      setEditedDocument({ id: null, title: "", description: "" });
    } catch (err) {
      setError("Failed to update document");
      console.error("Error updating document:", err);
    }
  };

  
  const handleDeleteDocument = async (index) => {
    const authtoken = localStorage.getItem("token");
    try {
      const documentToDelete = documents[index];
      await axios.delete(`http://localhost:8080/api/document/deleteDocument/${documentToDelete.id}`,
        {
          headers:{
            "Authorization": `Bearer ${authtoken}`,
          }
        }
      );
      const updatedDocuments = documents.filter((_, i) => i !== index);
      setDocuments(updatedDocuments);
    } catch (err) {
      setError("Failed to delete document");
      console.error("Error deleting document:", err);
    }
  };

 
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  //||
    //doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  
  return (
    <div className="user-dashboard-container">
      <NavigationBar2 />
    <div className="container">
      <h2>Document Management</h2>

      {loading && <div>Loading documents...</div>}
      {error && <div className="error">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

     
      {/* <div className="new-document-form">
        <h3>Create a New Document</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={newDocument.title}
          onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
        />
        <textarea
          className="form-control"
          placeholder="Description"
          value={newDocument.description}
          onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleCreateDocument}>
          Create Document
        </button>
      </div> */}

      {/* Table of documents */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>uploaderEmail</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document, index) => (
              <tr key={document.id}>
               
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedDocument.name}
                      onChange={(e) =>
                        setEditedDocument({ ...editedDocument, name: e.target.value })
                      }
                    />
                  ) : (
                    document.name
                  )}
                </td>
                
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedDocument.uploaderEmail}
                      onChange={(e) =>
                        setEditedDocument({
                          ...editedDocument,
                          uploaderEmail: e.target.value,
                        })
                      }
                    />
                  ) : (
                    document.uploaderEmail
                  )}
                </td>
                <td>{document.uploadedAt}</td>
                <td className="file-actions">
                  {editingIndex === index ? (
                    <>
                      <button className="btn btn-success" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditingIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <button
                        className="btn btn-warning"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button> */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteDocument(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No documents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DocumentManagement;
