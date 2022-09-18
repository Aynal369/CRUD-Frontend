import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const { register, handleSubmit, reset } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    const fullName = data.fullName;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    const newData = {
      fullName,
      email,
      phoneNumber,
      address,
    };
    axios
      .post("http://localhost:5000/app/v1/users", newData)
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success(`${res.data?.message}`);
          reset();
          navigate("/users");
        }
      })
      .catch((err) => {
        if (err.response.data?.status === "fail") {
          toast.warn(`${err.response.data?.message}`);
        }
      });
  };
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="shadow p-2 my-3">
              <p className="display-6 text-muted text-center">
                Add a new product
              </p>
              <hr />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="row justify-content-center g-4"
              >
                <div className="col-sm-10">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    {...register("fullName")}
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...register("email")}
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    className="form-control"
                    {...register("phoneNumber")}
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    {...register("address")}
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Add Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
