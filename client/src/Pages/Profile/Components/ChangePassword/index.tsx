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

import { FaKey } from "react-icons/fa";

import { useProfile } from "../../../../Hooks/useProfile";

const ChangePassword: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { changeCurrentUserPassword, loading, validatePassword, password, isPasswordDisabled } = useProfile();

  return (
    <>
      <Button style={{ width: "60%" }} onClick={onOpen}>
        Change password
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Changing user account password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <InputLeftElement>
                <Icon as={FaKey} />
              </InputLeftElement>
              <Input
                pr="4.5rem"
                type={"text"}
                name="password"
                placeholder="Enter new password"
                isInvalid={password === undefined}
                onBlur={(e) => validatePassword(e.currentTarget.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              isLoading={loading}
              isDisabled={isPasswordDisabled}
              onClick={() => {
                changeCurrentUserPassword();
                onClose();
              }}
            >
              Change
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

export default ChangePassword;
