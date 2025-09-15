# 🌍 Tour & Travel BiH API – Postman Tests

This repository contains **Postman collections, environments, and test scripts** for the **Tour & Travel API**.  
It is designed for **API testing, CI/CD integration, and documentation**.

---

## 🚀 Features
- ✅ User registration & login flow  
- ✅ Token-based authentication  
- ✅ Favorites, reservations & reviews 
- ✅ Dynamic environment variables (IDs, tokens, accounts)  

---

## 📂 Repository Structure
```
Tour_and_Travel_BiH_API---Testing/
├── Tests/
│   └── Positive Endpoints/
├── postman/
│   ├── collections/
├── reports/
└── README.md

```

---

## 🛠️ Tools Used
- [Postman](https://www.postman.com/) – for API testing  
- [Visual Studio](https://visualstudio.microsoft.com/) – for running and debugging the backend API  
- [MS SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) – for database management
- [Swagger UI](https://swagger.io/tools/swagger-ui/) – for interactive API documentation and quick manual testing

---

## ▶️ How to Run Tests Locally
 ```
1.Clone the backend API project (if you don’t already have it locally):
   
    git clone https://github.com/nejlaBelagosi/Tour_and_Travel_BiH.git
    cd Tour_and_Travel_BiH/TourAndTravelBiH

2. Clone this repository with Postman tests:

   git clone https://github.com/nejlaBelagosi/Tour_and_Travel_BiH_API---Testing.git
   cd Tour_and_Travel_BiH_API---Testing
```
---

## ▶️ Running Tests
- Run the tests directly in Postman:
- Open Postman.
- Import the collection from collections/.
- Import the environment from environments/.
- Start the Collection Runner in Postman.
- View results inside Postman or export them manually.

---

## 📝 Notes

- ⚠️ This API is running locally (http://localhost:5278/) → make sure backend is up before running tests.
- ⚠️ Authentication uses Bearer Token – headers must include a valid Authorization token.

---

