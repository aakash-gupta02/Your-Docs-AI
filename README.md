# Your Docs - AI

![App Screenshot](https://i.imgur.com/example-screenshot.png)  
*(Replace with your actual screenshot URL)*

A smart document editor with AI-powered features, offering both cloud storage for registered users and a free trial for guests.

## 🌟 Features

### For All Users
- 📝 Create & edit rich text documents
- ✨ AI-powered tools (summarize, expand, correct grammar)
- 📁 Download documents as text files
- 🔍 Clean markdown-supported formatting

### For Free Trial Users
- 🆓 Create up to 3 documents (stored in browser)
- ⚠️ Persistent warning banner showing usage
- 🔄 Seamless migration to cloud when signing up

### For Registered Users
- ☁️ Unlimited cloud storage
- 🛡️ Secure document access
- 🤝 Shareable document links
- 📊 Advanced AI features

## 🖥️ Screenshots

### Free Trial Mode
| Feature | Screenshot |
|---------|-----------|
| Document List | ![Image](https://github.com/user-attachments/assets/1248815b-42ff-4294-9821-dc5b9c2bbb03) |
| Usage Warning | ![Image](https://github.com/user-attachments/assets/e6bcccf0-884b-4f7b-9620-5523a37e1f32) |
| Role Based Features | ![Image](https://github.com/user-attachments/assets/cb9c3226-7240-4ef5-a6e7-b86e4559f86d) |

### Full Version (Logged In)
| Feature | Screenshot |
|---------|-----------|
| Dashboard | ![Image](https://github.com/user-attachments/assets/cbb7008d-3f6d-45d9-8487-6453a84a15c1) |
| Docs Actions | ![Image](https://github.com/user-attachments/assets/0bdc51f9-9365-4c5a-a8db-1a7c72a9ffe4) |
| AI Tools |![Image](https://github.com/user-attachments/assets/50e04483-4113-4a07-8682-b2b5809b624a) |
| Document AI | ![Image](https://github.com/user-attachments/assets/7ae16043-af96-47ed-a064-fce59564e504) |


## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB Atlas (for cloud storage)
- Gemini API key (for AI features)

### Installation
```bash
git clone https://github.com/aakash-gupta02/Your-Docs-AI.git
cd Your-Docs-AI
npm install
```

### Configuration
Create `.env` file:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_ai_key
CLIENT_URL=http://localhost:3000
```

### Running the App
```bash
npm run dev
```

## 🔄 Free Trial Flow

1. **As Guest User**:
   - Create documents (max 3)
   - All data stored in browser's localStorage
   - See persistent usage counter

2. **When Limit Reached**:
   ![Limit Modal](https://i.imgur.com/limit-modal.png)
   - Blocked from creating new documents
   - Prominent sign-up encouragement

3. **After Signup**:
   - All trial docs automatically migrate to cloud
   - Unlimited document creation

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: Node.js/Express
- **Database**: MongoDB
- **AI**: Google Gemini API
- **Auth**: JWT

## 🤝 Contributing
Pull requests welcome! For major changes, please open an issue first.

## 📄 License
MIT


chat gpt 

# 📄 Your Docs AI

Your Docs AI is a modern, AI-powered document management web application that allows users to create, edit, and manage documents seamlessly. Whether you're a registered user or exploring the free trial, this platform offers a user-friendly interface with robust features.

---

## 🚀 Features

* **AI-Powered Document Creation**: Leverage AI to generate and edit documents efficiently.
* **User Authentication**: Secure login and registration for personalized experiences.
* **Free Trial Mode**: Access core features without registration, with limitations.
* **Document Management**: Create, read, update, and delete documents.
* **Responsive Design**: Optimized for various devices and screen sizes.

---

## 🧪 Free Trial Mode

Users can explore the application without signing up. In this mode:

* **Document Limit**: Create up to 3 documents.
* **Local Storage**: Documents are stored in the browser's local storage.
* **Limited Features**: Some features like cloud sync and advanced analytics are unavailable.

---

## 🔐 Authenticated Users

Registered users enjoy full access:

* **Unlimited Documents**: Create and manage as many documents as needed.
* **Cloud Storage**: Documents are securely stored in the cloud.
* **Advanced Features**: Access to analytics, sharing options, and more.

---

## 🖼️ Screenshots

### Free Trial Mode

![Image](https://github.com/user-attachments/assets/1248815b-42ff-4294-9821-dc5b9c2bbb03)
*Description: Interface showcasing the limited features available in free trial mode.*

### Authenticated User Dashboard

![Authenticated User Dashboard](screenshots/authenticated_dashboard.png)

*Description: Dashboard view for registered users with full feature access.*

---

## 🛠️ Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/aakash-gupta02/Your-Docs-AI.git
   cd Your-Docs-AI
   ```



2. **Install Dependencies**:

   ```bash
   npm install
   ```



3. **Start the Development Server**:

   ```bash
   npm start
   ```



4. **Access the Application**:

   Open your browser and navigate to `http://localhost:3000`.

---

## 📂 Project Structure

```plaintext
Your-Docs-AI/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── .gitignore
├── package.json
└── README.md
```



---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this `README.md` further to suit your project's specific needs. If you have any more requirements or need assistance with other aspects of your project, feel free to ask!


---
