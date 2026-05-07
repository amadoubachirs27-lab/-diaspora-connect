# 🌍 DiasporaConnect

A full-stack forum web application for the African diaspora community, built with Node.js, Express, MySQL, and React.

## 🚀 Features
- User registration and login with JWT authentication
- Browse forum categories (Studying Abroad, Finance, Entrepreneurship, Culture, Practical Life Tips)
- Ask and answer questions in each category
- Secure protected routes
- Responsive and modern UI

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Database | MySQL |
| Backend | Node.js, Express, JWT, bcryptjs |
| Frontend | React, Vite, React Router, Axios |

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
# Create a .env file with your DB credentials
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🗄️ Database
Import the `diaspora_connect.sql` file into MySQL:
```bash
mysql -u root -p < diaspora_connect.sql
```

## 📁 Project Structure
