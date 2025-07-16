# 🧠 Oxeir - SkillScore-Based Job Recommendation Engine

A full-stack web application that intelligently recommends jobs to users based on their **SkillScore**, completed courses, quiz tags, and personal goals. Built as a technical assignment for **Oxeir Technologies**.

---

## 🔗 Live Links

- 🔸 Frontend (Netlify): [https://oxeir-job-recommendation-engine-ankus.netlify.app](https://oxeir-job-recommendation-engine-ankus.netlify.app)
- 🔸 Backend (Render): [https://oxeir-job-recommendation-engine-ankush.onrender.com](https://oxeir-job-recommendation-engine-ankush.onrender.com)
- 🔸 API DOC (PostMan):[Click here to view & test API collection](https://martian-crescent-931640.postman.co/workspace/Oxier~85b72e91-d962-4685-b6e8-1390c83fc165/collection/45309559-adc44eaf-49f9-48db-bb32-6aa8d1d055f0?action=share&creator=45309559)

---

## 📥 Download Postman Collection (Offline Use)

If you'd like to test the API without importing via public URL, you can download and import the full Postman collection JSON manually:

📎 [Click here to download the Postman collection JSON](https://drive.google.com/file/d/15OL-rqaSX3MmsB-sY68GmDR187KdaQDW/view?usp=sharing)

> Import it in Postman using:
> **File > Import > Upload File > Select the downloaded JSON**

---


---

## 📦 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Router DOM
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth
- **Deployment**: Netlify (Client), Render (Server)

---

## 📘 Features

### 👤 User Role
- Register with skillScore, goals, tags, and completedCourses
- Get top 10 recommended jobs based on:
  - Skill overlap
  - SkillScore threshold match
  - Tag/Goal match
- Explanation for each job recommendation

### 🏢 Employer Role
- Register and login
- Post new jobs (title, company, tags, requiredSkills, skillScoreThreshold)
- View all jobs created

### 🔐 Auth
- JWT authentication
- Role-based access (user/employer)
- Protected routes on both frontend and backend

---

## 🧠 Matching Logic (AI Brief)

The job recommendation logic uses the following weighted scoring:

| Criteria               | Weight |
|------------------------|--------|
| Skill tag overlap      | 50%    |
| SkillScore proximity   | 20%    |
| Goal/Interest match    | 20%    |
| Not applied previously | 10%    |

Only jobs that the user hasn't already applied to are considered. Jobs are returned with a `matchScore` (0–100) and an explanation (e.g., "React + Git matched, Score fit 90%").

---

---

## 🛠️ Setup Instructions

## server .env demo
```bash
PORT = 5000
MONGO_URI = your mongo url
JWT_SECRET = your secret
CLIENT_URL = http://localhost:5173
```

# frontend .env demo
```bash
VITE_SERVER_URL = http://localhost:5000
```

<details>
<summary>📥 Full Stack Setup (Frontend + Backend)</summary>

### 🔧 Clone the repository

```bash
git clone https://github.com/ankush-coder-497001/oxeir-Job-Recommendation-Engine--Ankush-Kumar_Gupta.git
```
### server setup
```bash
cd server
npm install
touch .env 
npx nodemon
```
### Frontend setup
```bash
cd  client
npm install
touch .env
npm run dev
```
 




