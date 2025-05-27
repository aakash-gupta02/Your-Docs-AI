# Your Docs - AI

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
   ![Limit Modal]![Image](https://github.com/user-attachments/assets/e6bcccf0-884b-4f7b-9620-5523a37e1f32)
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

