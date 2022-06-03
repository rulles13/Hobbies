import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const RegisterForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [adresse, setAdresse] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const terms = document.getElementById("terms");
      const pseudoError = document.querySelector(".pseudo.error");
      const emailError = document.querySelector(".email.error");
      const passwordError = document.querySelector(".password.error");
      const passwordConfirmError = document.querySelector(".password-confirm.error");
      const termsError = document.querySelector(".terms.error");
  
      passwordConfirmError.innerHTML = "";
      termsError.innerHTML = "";
  
      if (password !== controlPassword || !terms.checked) {
        if (password !== controlPassword)
          passwordConfirmError.innerHTML =
            "Les mots de passe ne correspondent pas";
  
        if (!terms.checked)
          termsError.innerHTML = "Veuillez valider les conditions générales";
      } else {
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/user/register`,
          data: {
            pseudo,
            email,
            adresse,
            latitude,
            longitude,
            password,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.errors) {
              pseudoError.innerHTML = res.data.errors.pseudo;
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    const geoLoc = (e) => {
      e.preventDefault();
      if (!adresse) console.log("no adresse");
      else {
        const params = {
          access_key: process.env.REACT_APP_API_POSITIONSTACK_TOKEN,
          query: { adresse },
          country: 'BE',
        }

        console.log(params);
        
        axios.get('http://api.positionstack.com/v1/forward', {params})
          .then(response => {
            console.log(response.data);
            setLatitude(response.data.data[0].latitude);
            setLongitude(response.data.data[0].longitude);
            console.log({latitude});
            
          }).catch(error => {
            console.log(error);
          });
      }
    }
  
    return (
      <>
        {formSubmit ? (
          <>
            <SignInForm />
            <span></span>
            <h4 className="success">
              Enregistrement réussi, veuillez-vous connecter
            </h4>
          </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="adresse">Adresse</label>
            <br />
            <input
              type="adresse"
              name="adresse"
              id="adresse"
              onChange={(e) => setAdresse(e.target.value)}
              value={adresse}
            />
            <br />
            <button onClick={geoLoc}> Me géolocaliser </button>
            <div className="adresse error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br/>
            <input
              type="password"
              name="password"
              id="password-conf"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                conditions générales
              </a>
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Valider inscription" />
          </form>
        )}
      </>
    );
  };


export default RegisterForm;