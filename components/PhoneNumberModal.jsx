import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
const PhoneNumberModal = ({ open, close }) => {
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/user/${session?.user?.id}`, {
        method: "PATCH",
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });
      if (response.ok) {
        close();
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: 400, xs: 250 },
    bgcolor: "background.paper",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick" && "escapeKeyDown") return;
    myCloseModal();
  };

  return (
    <Modal
      disableBackdropClick
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 style={{ fontWeight: "bold" }}>Enter Phone Number To Continue</h2>
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="+2347022783456"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default PhoneNumberModal;
