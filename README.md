# Family Organiser – Coursework CW1

This project forms part of **Frontend Web Development CW1**. It includes a **React Single Page Application (SPA)** that communicates with a **Node.js / Express backend API** paired with a lightweight **NeDB database**.  
The goal of the system is to act as a **Family Organiser**, allowing users to register, sign in, and manage events within their designated family group.

---

## Live Site

https://stellular-druid-1007cb.netlify.app/

Demo User 1:
- **Username:** DemoUserOne
- **Family Id:** family_1
- **Password:** Password123*

Demo User 2:
- **Username:** DemoUserTwo
- **Family Id:** family_1
- **Password:** Password456*

Demo User 3:
- **Username:** DemoUserThree
- **Family Id:** family_2
- **Password:** Password789*


---

## Main Features

### User Accounts
- User registration with password rules  
- Login system that stores sessions in localStorage  
- Each user is assigned to a specific family group  
- Users only see events linked to their own family  
- Only the event creator can modify or remove their own events  
- Admin users have permission to create family events  

### Event Tool
Users can fully manage events, including:
- Creating new events (title, date, time range, location, necessary items)  
- Updating existing events  
- Deleting events they created  

### Search & Filter System
Events can be filtered by:
- Name  
- Location  
- Organiser  
- Date  

### Backend Architecture
- RESTful API built with Express  
- NeDB database files: `users.db`, `events.db`  
- Secure password hashing with salts  

---

## Technology Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React (Vite), JavaScript, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | NeDB (file-based storage) |
| **Tools** | npm, Git, Vite |

---

# Setup Instructions

Follow these steps to install and run the project.

---

## 1️ Clone the Repository

```bash
git clone https://github.com/Batman08/FEWD2526_Coursework_Bilal_Asghar.git
cd FEWD2526_Coursework_Bilal_Asghar
```

## 2️ Install Dependencies
Inside the backend folder, install all required dependencies:

```bash
npm install
```

This installs all necessary Node modules listed in `package.json` (including Express and CORS).

## 3️ Run the Backend Server
Start the backend server locally:

```bash
npm start
```
Upon first run you may get an error in that case run node index.js again

## 4️ Set Up and Run the Frontend
Navigate to the frontend folder and install dependencies:

```bash
npm install
```

Start the react application:

```bash
npm run dev
```

Vite will start a local development server, usually on:
```
http://localhost:5173/
```

Open that link in your browser to view your React app.  
Ensure both servers are active:

- **Backend:** http://localhost:3002  
- **Frontend:** http://localhost:5173  

If the frontend fetches data from the backend successfully then the setup is complete.

---

## Author

**Bilal Asghar**  
**Student ID: S2132495**

---

## Added Features

This project includes extra features not explicitly required in the coursework brief:

### Google Maps Integration
- Each event now includes a “View on Map” button
- The event’s location is automatically passed to Google Maps using a query param.

---

### Logout Functionality
- User can logout and clear authentication state.

---

### Voice Recognition for Event Input Fields
- Certain inputs for adding/editing event show voice input button
- Users can speak to update certain form inputs when adding or editing an event

---

### Event Ownership
- All events are automatically tagged with:
  - **Organiser username**
  - **Organiser family ID**
- Event Page shows event counter
---

### UI/UX
- Use of Fontawesome Icons
- Tailwind CSS for extensive styling
