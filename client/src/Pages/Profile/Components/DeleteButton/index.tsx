import { FC } from "react";

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import { useProfile } from "../../../../Hooks/useProfile";

const DeleteButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteCurrentUser } = useProfile();

  return (
    <>
      <Button onClick={onOpen} style={{ width: "60%" }}>
        Delete
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting a user account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete your account?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={deleteCurrentUser}>
              Delete
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

export default DeleteButton;
