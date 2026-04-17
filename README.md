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
