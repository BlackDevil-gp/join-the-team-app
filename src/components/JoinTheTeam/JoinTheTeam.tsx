import Checkbox from "@mui/joy/Checkbox";
import React, { useEffect, useRef, useState } from "react";
import StandarButton from "../StandarComponents/StandarButton";
import StandarInput from "../StandarComponents/StandarInput";
import "./joinTheTeam.css";
import { getRegisteredUsers } from "../../api/joinTheTeamCalls";
import { IRegisteredUsers } from "../../interfaces/users";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Skeleton from "@material-ui/lab/Skeleton";

export default function JoinTheTeam(): JSX.Element {
  const [registerUsers, setRegisterUsers] = useState<string[]>([]);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const nodeRef = useRef(null);

  // Get the registered users from the API
  useEffect(() => {
    getRegisteredUsers().then((data: IRegisteredUsers) => {
      setRegisterUsers(data.team);
    });
  }, []);

  function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    return setUserName(event.target.value);
  }

  // Handle the Email input and check if the Email is valid else show an error msg
  function handleEmailInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = event.target.value;
    setUserEmail(email);

    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  function handleAgreeTermsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAgreeTerms(event.target.checked);
  }

  // A simple delay, pretends the server delay to register the user
  async function waitForTwoSeconds() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  async function handleButtonClick() {
    setSignUpLoading(true);
    await waitForTwoSeconds();
    setRegisterUsers([...registerUsers, userName]);
    setUserName("");
    setUserEmail("");
    setAgreeTerms(false);
    setSignUpLoading(false);
  }

  return (
    <div className="d-flex flex-wrap vh-100">
      <div className="side_panel bg_cogs">
        <h1 className="d-flex flex-column my-5 text-white">
          <span>Join</span>
          <span>the</span>
          <span>team</span>
        </h1>
        <ul className="text-white ps-4">
          {registerUsers.length === 0 ? (
            <div style={{ marginLeft: -20 }}>
              <Skeleton variant="text" animation="wave" width={120} height={25} component="span" />
              <Skeleton variant="text" animation="wave" width={70} height={25} component="span" />
              <Skeleton variant="text" animation="wave" width={95} height={25} component="span" />
              <Skeleton variant="text" animation="wave" width={105} height={25} component="span" />
            </div>
          ) : (
            <TransitionGroup>
              {registerUsers.map((user, index) => (
                <CSSTransition key={index} timeout={400} nodeRef={nodeRef} classNames="slide_vertical">
                  <li ref={nodeRef}>
                    <span className="users_list">{user}</span>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </ul>
      </div>
      <div className="register_form d-flex flex-column justify-content-center">
        <h2 className="mb-5 mt-0">Register</h2>
        <h3 className="mb-3">Team player - Be positive - Beat yesterday</h3>
        <p className="mb-2 lh-base">Together we re-define the experience of online gaming through gamification and novel technical solutions</p>
        <StandarInput styles={{ marginBottom: 8 }} text={`Name`} onChange={handleNameInputChange} clearValue={userName} />
        <StandarInput styles={{ marginBottom: 4 }} text={`Email`} onChange={handleEmailInputChange} clearValue={userEmail} error={emailError} />
        {emailError && <span className="text-danger">Please provide a valid email.</span>}
        <Checkbox
          className="mb-5 mt-3"
          color="primary"
          size="sm"
          label="I agree to the terms"
          checked={agreeTerms}
          onChange={handleAgreeTermsChange}
        />
        <StandarButton
          styles={{ width: 200 }}
          text={`I'm in, sign me up!`}
          disabled={userName.length === 0 || userEmail.length === 0 || agreeTerms === false || emailError ? true : false}
          loading={signUpLoading}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}
