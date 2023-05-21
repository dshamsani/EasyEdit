import { FC } from "react";

import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useProfile } from "../../../../Hooks/useProfile";

const EditButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { validateEmail, validateName, validateSurname, validateAge, email, name, surname, age, isEditDisabled, editCurrentUser, loading } =
    useProfile();

  return (
    <>
      <Button style={{ width: "60%" }} onClick={onOpen}>
        Edit
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing user account data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup pb={5}>
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
            <InputGroup pb={5}>
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
            <InputGroup pb={5}>
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
            <InputGroup pb={5}>
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
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              isLoading={loading}
              isDisabled={isEditDisabled}
              onClick={() => {
                editCurrentUser();
                onClose();
              }}
            >
              Edit
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditButton;
