const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://collab_user:Io3202!!@localhost:5432/collaboratory')



const dblogin = async (username) => {
    
    let ud;
     await db.any("Select * from users where username=$1", username)
    .then(user_details => {
        ud = user_details
    })
    .catch(error => {
        console.log(error);
        return error;
    });

    return ud

};

 const dbregister = async (username, hashed_password) => {
    

    db.connect()
    .then(obj => {
        // obj.client = new connected Client object;

        sco = obj; // save the connection object;

        // execute all the queries you need:
        return sco.any( "INSERT INTO users (username, password) VALUES ($1, $2)", // registers username and password
        [username, hashed_password]);
    })
    .then(data => {
      

        return true
    })
    .catch(error => {
        console.log(error);
        return false
    })
    .finally(sco => {
        // release the connection, if it was successful:
        if (sco) {
        
    
            sco.done(true);
        }
    });
    
  };


  module.exports = { dblogin, dbregister}