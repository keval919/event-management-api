# 🎟 Event Management API

An event management backend built using Node.js and PostgreSQL.  
It handles user creation, event registrations, event listing, and cancellation logic.

---

## 🚀 Features

- User registration with unique email
- Event creation with capacity and date-time constraints
- Register/unregister users for events
- Enforces:
  - Max 1000 registrations per event
  - No registrations after event start
  - No duplicate registrations
- Filter events by time or location
- Sort events by time or location

---

## 🛠 Tech Stack

- *Node.js* + *Express.js*
- *PostgreSQL*
- *pg* (node-postgres)
- *dotenv* for config
- RESTful architecture

---

---
### Set Up Instructions ###

insert a credentials into .env file given with repository to setup hosting and 
listen on port eigher 4545 or give port in .env file

---


## 📫 API Usage Examples

_All requests use:_  
**Content-Type:** `application/x-www-form-urlencoded`

---

### 👤 Create User  
**POST** `/user`  

**Body:**
```
name=Keval  
email=keval@example.com
```

**Response:**
```
josn format Response
```

---

### 🗓️ Create Event  
**POST** `/create-event`  

**Body:**
```
title=Hackathon 2025  
description=description .......... 
location=Aurangabad  
user_id=1
```

**Response:**

json format registred event info

---

### ✅ Register for Event  
**POST** `/event-registration`  

**Body:**
```
user_id=1  
event_id=1
```

**Response:**
```json
{
  "message": "User registered for event successfully"
}
```

---

### ❌ Cancel Registration  
**DELETE** `/cancel-registration/:event_id`  

**Route Param:**  
```
event_id = 1
```

**Body:**
```
user_id=1
```

**Response:**
```json
{
  "message": "Registration cancelled successfully"
}
```

---

### 🔎 Get Event by ID  
**GET** `/get-event/:id`  

**Response:**
```json
{
  "id": 1,
  "name": "Hackathon 2025",
  "location": "Aurangabad",
  "date": "2025-07-20T15:00:00.000Z",
  "capacity": 300,
  "registration_count": 1
}
```

---

### 📊 Event Stats  
**GET** `/event-stats/:id`  

**Response:**
```json
{
  "totalRegistrations": 600,
  "remainingCapacity": 400,
  "capacityPercentage": 40,
}
```

---

### 🕒 Future Events  
**GET** `/upcoming-events/future-events`  

**Response:**
json format events data which are comes in future


---

### 🅰️ Events Sorted by Location  
**GET** `/upcoming-events/by-alphabetic-order`  

**Response:**
json format events data in alphabetical order of location


---

### ⏳ Events Sorted by Date (Ascending)  
**GET** `/upcoming-events/by-ascending-date`  

**Response:**
json format events data base on ascending time sorting


---


---

root----|
        |---server.js
        |---schema.sql
        |---README.md
        |---package.json
        |---.env
        |
        |---routes----|
        |             |---routes.js
        |
        |---models---|
        |            |---db.js
        |            |---query.js
        |
        |---controllers---|
                          |---user.js
                          |---event.js
                          |---registration.js
                          |---list_events.js
