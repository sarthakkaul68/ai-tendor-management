AI-DMS System

AI-DMS (AI-Driven Document Management System) is an intelligent platform for managing organizational documents, automating workflows, and predicting tender win/loss outcomes. The system combines AI, role-based access control, and secure storage to streamline decision-making and enhance productivity.

🚀 Features
📁 Document Management

Centralized document storage with version control

Smart categorization and tagging

Secure upload, preview, and download functionality

🤖 AI Tender Prediction

Machine learning models evaluate historical data

Predicts tender win/loss probability

Helps teams make data-driven bidding decisions

🔐 Role-Based User Management

Admin, Manager, User, and custom roles

Access control for documents and modules

Activity logging and usage tracking

🔍 Smart Search

AI-powered keyword and content-based search

Fast indexing for large document repositories

🛠️ Tech Stack

Backend: Node.js / Python (customizable)

Frontend: React / Angular / Vue

Database: MongoDB / PostgreSQL

AI/ML: Python, TensorFlow / Scikit-learn

Authentication: JWT / OAuth

Storage: Local storage / AWS S3 / Azure Blob

📦 Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/AI-DMS.git
cd AI-DMS

2. Install dependencies
npm install     # For frontend/backend JS projects
pip install -r requirements.txt   # If using Python components

3. Configure environment variables

Create a .env file in the root directory:

PORT=5000
DB_URI=your_database_url
JWT_SECRET=your_secret_key
AI_MODEL_PATH=/models/tender_model.pkl
STORAGE_PATH=/uploads

4. Start the server
npm start


or

python app.py

🏗️ System Architecture (Overview)
                ┌────────────────────┐
                │     Frontend       │
                │ (React/Angular)    │
                └─────────┬──────────┘
                          │ REST API
                ┌─────────▼──────────┐
                │     Backend API     │
                │   (Node/Python)     │
                └─────────┬──────────┘
                          │
             ┌────────────▼─────────────┐
             │    AI/ML Prediction       │
             │ (Tender Win/Loss Model)   │
             └────────────┬─────────────┘
                          │
        ┌─────────────────▼───────────────────┐
        │ Document Storage (Local / Cloud)    │
        └─────────────────┬───────────────────┘
                          │
                ┌─────────▼──────────┐
                │    Database         │
                │ MongoDB/PostgreSQL │
                └─────────────────────┘

📡 API Endpoints (Sample)
Authentication
POST /api/auth/login
POST /api/auth/register

Documents
GET    /api/documents
POST   /api/documents/upload
DELETE /api/documents/:id

AI Prediction
POST /api/predict/tender

User Management
GET  /api/users
PUT  /api/users/:id/role

🖼️ Screenshots

(Add your UI screenshots here)
Example:

/screenshots/dashboard.png
/screenshots/upload_page.png

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to modify.

📄 License

This project is licensed under the MIT License.
