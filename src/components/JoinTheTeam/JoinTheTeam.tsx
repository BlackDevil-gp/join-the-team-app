import Checkbox from "@mui/joy/Checkbox";
import React, { useEffect, useState } from "react";
import StandarButton from "../StandarComponents/StandarButton";
import StandarInput from "../StandarComponents/StandarInput";
import "./joinTheTeam.css";
import { getRegisteredUsers } from "../../api/joinTheTeamCalls";
import { CircularProgress } from "@mui/joy";
import { IRegisteredUsers } from '../../interfaces/users';

export default function JoinTheTeam(): JSX.Element {
  const [registerUsers, setRegisterUsers] = useState<string[]>([]);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);

  useEffect(() => {
    getRegisteredUsers().then((data: IRegisteredUsers) => {
      setRegisterUsers(data.team);
    });
  }, []);

  function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    return setUserName(event.target.value);
  }

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
        <ul className="text-white">
          {registerUsers.length === 0 ? (
            <CircularProgress color="neutral" size="sm" />
          ) : (
            <>
              {registerUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </>
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
        <Checkbox className="mb-5 mt-3" color="primary" size="sm" label="I agree to the terms" checked={agreeTerms} onChange={handleAgreeTermsChange} />
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
