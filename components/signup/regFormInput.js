import { useRef } from "react";

import signUpStyles from "../../styles/signup.module.css";
import InputEmail from "../login/InputEmail";
import InputPassword from "../login/InputPassword";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function RegForm() {
  const emailInputRef = useRef();
  const passInputRef = useRef();

  function formSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;

    //validation of email and password
    const passwordLength = password.length > 5 && password.length < 60;

    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail)) {
      if (passwordLength) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("Sign up");
          })
          .catch((error) => {
            const { code, message } = error;
            console.error(message);
          });
      } else passInputRef.current.focus();
    } else emailInputRef.current.focus();
  }
  return (
    <form className={signUpStyles.formFlex} onSubmit={(e) => formSubmit(e)}>
      <InputEmail
        setRef={emailInputRef}
        inputId={"RegFormInputEml"}
        page={"regForm"}
      />
      <InputPassword
        setRef={passInputRef}
        inputId={"RegFormInputPas"}
        page={"regForm"}
      />

      <button className={`${signUpStyles.nextButton}`} type="submit">
        Next
      </button>
    </form>
  );
}
