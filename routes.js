
const { dblogin, dbregister} = require('./db');
const bcrypt = require('bcrypt');




async function comparePassword(plaintextPassword, hash) {
    bcrypt.compare(plaintextPassword, hash)
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err)
        })
 }

 const home = async (req, res) => {
    res.render('login');
};
  
 const postLogin = async (req,res) => { //handles login post request
    let username = req.body.username;
    let password = req.body.password;

    let user_details = await dblogin(username);
  
    if (username != null && password != null) {
      await dblogin(username).then(ud => {
        user_details = ud
      }).catch(error => {
        console.log("errtest: " + error)
      })

    

        
        if (user_details != undefined && user_details != null) {
   
          let hashed_password = user_details[0].password;;
          let user_id = user_details[0].id;
       
          bcrypt
            .compare(password, hashed_password)
                .then(result => {
                    if(result){
                        //ctx.cookies.set("user", user_id);
                        res.redirect("/userhome"); // redirects user to their home page
                    } else{
                        console.log("login failed");
                        res.render("login", {
                        error: "Incorrect password or username",
                        });
                    }
                  })
                .catch(err => {
                  console.log("error:")
                  console.error(err.message)
                  res.render("login", {
                    error: "login error, try again",
                  });
                });   
      } else {
        console.log("login failed");
          res.render("login", {
            error: "Incorrect password or username",
          });
      }

    } else {
        console.log("login failed, nothing entered");
        res.render("login", {
          error: "No password or username entered",
        });
      
    }

   
  };


  const postRegister = async (req,res) => { //handles register post request
   
    let username = req.body.username;
    let password = req.body.password;
    
    if (username != null && password != null) {
      bcrypt
        .hash(password, 10)
        .then(hash => {
          if ( dbregister(username, hash)) { // submits user info to database//
            console.log("registration success");
            res.redirect("/");
          } else {
            console.log("registration failed");
            res.render("register", {
                error: "registration error, try again",
              });
          }
       })
      .catch(err => console.error(err.message))
  
     
      
    } else {
      console.log("registration failed");
      res.render("register", {
        error: "registration failed, please enter a username and password",
      });
    }
  };


  module.exports = {home, postLogin, postRegister}

  
  