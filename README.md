Build a simple e-commerce app with 3 services: frontend, product API, and auth

✅ Stack: React, Node.js (Express), PostgreSQL

✅ CI/CD:

Lint/test/build Docker images

Deploy to AWS ECS or EKS

Use GitHub Actions Matrix builds (for multiple microservices)

Integrate with GitHub Actions OIDC + AWS AssumeRole (no AWS keys!)


Microservices

Frontend – React-based SPA

Product API – Express.js + PostgreSQL

Auth API – Express.js + JWT + PostgreSQL

------------------------------------------------
Working Features

User registration & login

Token storage and rehydration

CORS correctly handled across frontend and backend

Dynamic Welcome, username display

Products fetched from product API

Backend - 

![image](https://github.com/user-attachments/assets/33ae8a93-0ef8-45d8-973a-5e5fe764a048)

Frontend - 

![image](https://github.com/user-attachments/assets/39c568b6-095f-488e-ab55-78a31e876f7d)

-----------------------------------
CI Part to dockerize the frontend, auth and product-api. 

![image](https://github.com/user-attachments/assets/284b10a8-59a2-4cb6-884c-2aee1469a935)

Pushed to DockerHub:

![image](https://github.com/user-attachments/assets/68f947b7-163f-4559-9ca6-5f011c7445f4)




