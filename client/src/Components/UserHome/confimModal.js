import React from "react";
import Modal from "../ReusableComponents/Modal/modal";
// import { Posts } from "../posts_contex";

function ConfirmModal({ stateToCancel, ...rest }) {
  // const { showConfirmModal, setShowConfirmModal } = useContext(Posts);

  return (
    <div>
      <Modal stateToCancel={stateToCancel} {...rest} />
    </div>
  );
}

export default ConfirmModal;
