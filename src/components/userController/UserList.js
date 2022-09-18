import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let isSubscribed = true;
    axios
      .get("https://crud-backend-6tqntfvzo-aynal369.vercel.app/app/v1/users")
      .then((res) => {
        if (isSubscribed) {
        }
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => (isSubscribed = false);
  }, []);

  const handleClientUpdate = (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDeleteClient = (id) => {
    const proceed = window.confirm("Are you sure you want to delete");
    if (proceed) {
      axios
        .delete(
          `https://crud-backend-6tqntfvzo-aynal369.vercel.app/app/v1/users/${id}`
        )
        .then((res) => {
          if (res.data.data.deletedCount > 0) {
            toast.success("Successfully deleted one user");
            const remaining = users.filter((data) => data._id !== id);
            setUsers(remaining);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <section>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-10">
            <div className="shadow p-2 my-3">
              <div className="table-responsive">
                <table className="table table-sm table-hover table-bordered align-middle text-center table-striped">
                  <thead className="table-info shadow-sm">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Address</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((data, index) => (
                      <tr key={data._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.fullName}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.address}</td>
                        <td>
                          <Button onClick={() => handleClientUpdate(data._id)}>
                            <EditIcon color="warning" />
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => handleDeleteClient(data._id)}>
                            <DeleteForeverIcon color="error" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
