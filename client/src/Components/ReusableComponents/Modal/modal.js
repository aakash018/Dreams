import React from "react";

import CustomButton from "../CustomButton/button";
import Button from "../../ReusableComponents/Button/button";
// import { Posts } from "../../posts_contex";
import "./modal.css";

function Modal({
  stateToCancel,
  message,
  confirmedAction,
  confirmButtonText,
  disableButton,
}) {
  const handleCancel = () => {
    stateToCancel(false);
  };

  const handleConfirmed = () => {
    confirmedAction();
  };

  return (
    <div className="modalContainer">
      <div className="modalWraper">
        <section className="modalCancleButton">
          <CustomButton content="&times;" action={handleCancel} />
        </section>
        <section className="modalMessage">{message}</section>
        <section className="modalOkButton">
          <Button
            text={confirmButtonText}
            action={handleConfirmed}
            disable={disableButton}
          />
        </section>
      </div>
    </div>
  );
}

export default Modal;
