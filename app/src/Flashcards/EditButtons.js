import * as React from "react";

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "./styles.module.scss";

const EditButtons = () => {
  return (
    <>
      <Stack spacing={2} direction="row" className={styles.stack}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="outlined" startIcon={<SaveAltIcon />}>
          Save
        </Button>
        <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
          Save and add more
        </Button>
      </Stack>
    </>
  );
};

export default EditButtons;
