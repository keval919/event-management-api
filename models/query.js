const increaseRegistartionCount= `UPDATE events SET registration_count=registration_count+1`

const users={
    createUser: `INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *`,
    getUser: `SELECT * FROM users WHERE id=$1`
}

const events={
    createEvent: `INSERT INTO events (title,description,date,location,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    increaseCount: `UPDATE events SET registration_count=registration_count+1 WHERE id=$1` ,
    checkRegistrationCount: `SELECT id FROM events WHERE id=$1 AND registration_count<=$2`,
    getRegistrationCount: `SELECT registration_count FROM events WHERE id=$1`,
    getEventByID: `SELECT * FROM events WHERE id=$1`,
    eventTime: `SELECT date FROM events where id=$1`,
    decreaseCount: `UPDATE events SET registration_count=registration_count-1 WHERE id=$1`
}

const registration={
    createRegistration: `INSERT INTO registration (user_id,event_id) VALUES ($1,$2) RETURNING *`,
    isAlreadyRegistered: `SELECT id FROM registration WHERE user_id=$1 AND event_id=$2`,
    getRegisteredUsers: `SELECT * FROM registration WHERE event_id=$1`,
    cancelRegistration: `DELETE FROM registration WHERE event_id=$1 AND user_id=$2 RETURNING *`
}

const querys={
    users,
    events,
    registration
}

module.exports=querys