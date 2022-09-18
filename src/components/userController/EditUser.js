import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [users, setUsers] = useState({});

  let navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://crud-backend-6tqntfvzo-aynal369.vercel.app/app/v1/users/${id}`
      )
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const { fullName, email, phoneNumber, address } = users;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crud-backend-6tqntfvzo-aynal369.vercel.app/app/v1/users/${id}`,
        users
      )
      .then((res) => {
        if (res.data.data.modifiedCount > 0) {
          toast.success("Successfully updated user");
          navigate("/users");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleInputChange = (e) => {
    setUsers({ ...users, [e.target.id]: e.target.value });
  };
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="shadow p-2 my-3">
              <p className="display-6 text-muted text-center">Update user</p>
              <hr />
              <form
                onSubmit={handleSubmit}
                className="row justify-content-center g-4"
              >
                <div className="col-sm-10">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    value={fullName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email || ""}
                    disabled
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    className="form-control"
                    value={phoneNumber || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-sm-10">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    value={address || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Update Now
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

export default EditUser;
