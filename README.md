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
