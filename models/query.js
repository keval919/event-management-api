const increaseRegistartionCount= `UPDATE events SET registration_count=registration_count+1`

const users={
    createUser: `INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *`,
}

const events={
    createEvent: `INSERT INTO events (title,description,date,location,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`
}

const registration={
    createRegistration: `INSERT INTO registration (user_id,event_id) VALUES ($1,$2) RETURNING *`
}

const querys={
    user,
    events,
    registration
}

module.exports=querys