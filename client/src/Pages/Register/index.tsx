import { FC } from "react";

import { Button, Heading, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import { useAuth } from "../../Context/AuthContext/context";

import "./styles.scss";

const RegisterPage: FC = () => {
  const {
    validateEmail,
    validatePassword,
    validateName,
    validateSurname,
    validateAge,
    email,
    password,
    name,
    surname,
    age,
    isRegisterDisabled,
    isRegistred,
    loading,
    registerUser,
  } = useLogin();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="easyedit-login">
        <div className="easyedit-login--container">
          <Heading as="h2" size="md">
            Register
          </Heading>
          <div className="easyedit-login--container__form">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineUser} />
              </InputLeftElement>
              <Input
                isInvalid={name === undefined}
                type="text"
                name="name"
                placeholder="Enter name"
                onBlur={(e) => validateName(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineUser} />
              </InputLeftElement>
              <Input
                isInvalid={surname === undefined}
                type="text"
                name="surname"
                placeholder="Enter surname"
                onBlur={(e) => validateSurname(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineUser} />
              </InputLeftElement>
              <Input
                isInvalid={age === undefined}
                type="text"
                name="age"
                placeholder="Enter age"
                onBlur={(e) => validateAge(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={MdOutlineMailOutline} />
              </InputLeftElement>
              <Input
                isInvalid={email === undefined}
                type="email"
                name="email"
                placeholder="Enter email"
                onBlur={(e) => validateEmail(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement>
                <Icon as={FaKey} />
              </InputLeftElement>
              <Input
                pr="4.5rem"
                type={"text"}
                name="password"
                placeholder="Enter password"
                isInvalid={password === undefined}
                onBlur={(e) => validatePassword(e.currentTarget.value)}
              />
            </InputGroup>
            <Button style={{ width: "100%" }} isLoading={loading} isDisabled={isRegisterDisabled} onClick={registerUser}>
              Register
            </Button>
          </div>
        </div>
      </div>
      {isAuthenticated ? <Navigate to="/" /> : null}
      {isRegistred ? <Navigate to="/login" /> : null}
    </>
  );
};

export default RegisterPage;
