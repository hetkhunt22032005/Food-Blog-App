# 🍽️ Food Blog App

A responsive and feature-rich food blog web application where users can browse recipes, read blogs, and share their culinary experiences.

---

## 🚀 Features

- 📝 Create, edit, and delete food blog posts
- 📸 Upload food images with posts
- 🔍 Search and filter posts by category or keywords
- 🧑‍🍳 User authentication and profiles
- 💬 Commenting system
- 🌐 Responsive UI for desktop and mobile

---

## 📂 Project Structure

```plaintext
Food-Blog-App/
├── backend/           # Server-side code (Node.js/Express)
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/          # React.js application
│   ├── components/
│   ├── pages/
│   └── ...
├── .env               # Environment variables
├── README.md          # Project documentation
└── package.json
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS / Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Image Upload:** Cloudinary / Multer

---

## 🛠️ Installation

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account (optional)

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/Food-Blog-App.git
cd Food-Blog-App

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Running the App

```bash
# Start backend server
cd backend
npm run dev

# Start frontend app
cd ../frontend
npm start
```

---

## 🧪 Testing

- API routes tested with Postman
- React components tested with Jest & React Testing Library (if configured)

---

## 🙋 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---
## 📬 Contact

For any inquiries, contact [hetkhunt22032005@gmail.com](mailto:hetkhunt22032005@gmail.com)
