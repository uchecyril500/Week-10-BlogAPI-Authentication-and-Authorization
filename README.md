--------------------Blog API – Authentication & Authorization--------------------


This is a simple Blog API built with Node.js, Express, and MongoDB.
It supports user registration, login, authentication, authorization, and article ownership.



-------------------Features-------------------

Users can sign up and log in.

Passwords are hashed using bcrypt.

Logged‑in users receive a JWT token.

All article routes are protected.

Only logged‑in users can create articles.

Each article belongs to the user who created it.

Only the owner can update or delete their article.

Articles support search and pagination.

API is deployed on Render.

----------------------Tech Stack-------------------


Node.js

Express.js

MongoDB (Mongoose)

JWT (jsonwebtoken)

Bcrypt

Render (deployment)



# **Blog API – Authentication & Authorization**

This is a simple Blog API built with Node.js, Express, and MongoDB.  
It uses JWT for authentication and follows the MVC structure.

---

## **Features**
- Users can register and log in.  
- Passwords are hashed with bcrypt.  
- Logged‑in users receive a JWT token.  
- All article routes are protected.  
- Only logged‑in users can create articles.  
- Each article belongs to the user who created it.  
- Only the owner can update or delete their article.  
- Articles support search using MongoDB text index.  
- Pagination is available for fetching articles.  
- API is deployed on Render.

---

## **Project Structure (MVC)**

```
project/
│
├── blog.js
├── package.json
├── .env
├── .env.example
│
├── controllers
│   ├── article.controller.js
│   └── user.controller.js
│
├── models
│   ├── article.model.js
│   └── user.model.js
│
├── routes
│   ├── article.route.js
│   └── user.route.js
│
├── Middlewares
│   ├── requireAuth.js
│   ├── logger.js
│   └── errorhandler.js
│
└── database
    └── connectDB.js
```

---

## **Installation**

1. Clone the repository:

```
git clone https://github.com/<your-username>/<repo-name>.git
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file and add:

```
PORT=3007
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```
npm run dev
```

---

## **Authentication Routes**

### **Register**
`POST /api/users/sign-up`

Body:
```json
{
  "name": "Uche",
  "email": "example@gmail.com",
  "password": "123456"
}
```

### **Login**
`POST /api/users/login`

Body:
```json
{
  "email": "example@gmail.com",
  "password": "123456"
}
```

Response includes a JWT token.

---

## **Protected Routes**

All article routes require:

```
Authorization: Bearer <token>
```

---

## **Article Routes**

### **Create Article**
`POST /api/articles`

### **Get All Articles**
`GET /api/articles?limit=10&page=1`

### **Search Articles**
`GET /api/articles/search?q=keyword`

### **Get Article by ID**
`GET /api/articles/:id`

### **Update Article**
`PATCH /api/articles/:id`

### **Delete Article**
`DELETE /api/articles/:id`

---

## **Ownership Rules**
- Only the user who created an article can update it.  
- Only the user who created an article can delete it.  
- Ownership is checked using the user ID inside the JWT token.

---

## **Deployment**
The API is deployed on Render.

Home URL:

```
https://your-render-url.onrender.com/
```

---

## **Status Route**
To check if the API is running:

```
GET /
```

Response:

```
Blog API is running on Render...
