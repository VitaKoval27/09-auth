
# Node.js Authentication API (HW-09) 🔐

A RESTful API focused on user security, implementing registration, login, and private routes with high-level data protection.

---

### 📝 Project Description
This backend project demonstrates a complete authentication flow. It handles user data securely, manages sessions using tokens, and protects API endpoints from unauthorized access.

### 🛠 Tech Stack
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)

### 🔑 Key Implementations:
- **JWT Authentication:** Implemented secure user sessions using **JSON Web Tokens** (Bearer strategy).
- **Password Security:** Integrated **Bcrypt** for hashing passwords before storing them in MongoDB.
- **Private Routes:** Developed custom **Auth Middleware** to restrict access to specific endpoints.
- **User Schemas:** Built complex user models with validation for email, password, and subscription levels.
- **RESTful Principles:** Organized project structure into Controllers, Services, and Routes for better scalability.

---

### 🚀 How to Install
1. Clone the repository:
   ```bash
   git clone [https://github.com/VitaKoval27/09-auth.git](https://github.com/VitaKoval27/09-auth.git)
