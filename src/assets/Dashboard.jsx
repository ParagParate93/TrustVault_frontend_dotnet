import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const userName = "Parag Parate"; // Replace with dynamic user data

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Trust Vault</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Upload Documents</li>
            <li>Shared Documents</li>
            <li>Activity Logs</li>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {userName}!</h1>
          <p>Securely manage and share your documents with ease.</p>
        </header>
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Documents</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>Shared Documents</h3>
            <p>18</p>
          </div>
          <div className="stat-card">
            <h3>Activity Logs</h3>
            <p>120</p>
          </div>
        </section>
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Document "Budget2024.pdf" was shared with Harshad Patil.</li>
            <li>You uploaded "ProjectPlan.docx".</li>
            <li>Sanket Yerigeri downloaded "Presentation.ppt".</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
