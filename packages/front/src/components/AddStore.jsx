import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FileInput from "./shared/FileInput";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const AddStore = ({ onSuccess }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    logo: "",
  });

  const [state, setState] = useState("idle");

  const handleOnChange = (e) => {
    setData((data) => ({ ...data, name: e.target.value }));
  };

  const handleOnFileChange = (e) => {
    setData((data) => ({ ...data, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    setState("loading");
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("logo", data.logo);

    try {
      const res = await axios.post("/api/stores", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setState("success");
      console.log(res.data);
      dispatch(onSuccess());
    } catch (error) {
      setState("error");
      console.log(error);
    }
  };

  return (
    <div className="w-full p-5 border border-gray-300 rounded-md">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {["success", "error"].includes(state) && (
          <Alert severity={state}>
            {state === "error"
              ? "Something went wrong!"
              : "It was created successfully"}
          </Alert>
        )}

        <div className="flex flex-col space-y-10">
          <TextField
            id="name"
            label="Name"
            value={data.name}
            onChange={handleOnChange}
          />

          <div className="w-full">
            <label className="mb-4 text-gray-500">Upload Logo</label>
            <FileInput type="image" onChange={handleOnFileChange} />
          </div>
          <Button
            type="submit"
            disabled={state === "loading"}
            color="primary"
            variant="contained"
          >
            Create Store
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStore;
