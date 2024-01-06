import { useEffect, useReducer, useState } from "react";
import { IoTrash } from "react-icons/io5";
import axios from "axios";

function HokDetails() {
  const inputReducer = (state, { type, payload }) => {
    switch (type) {
      case "GET_DATA_FROM_SERVER":
        return payload;

      case "SUBMIT_DATA_TO_SERVER":
        return payload;

      case "DELETED_DATA_FROM_SERVER":
        return state;

      case "FILTER_DATA_FROM_SERVER":
        return payload;

      default:
        return state;
    }
  };
  // using  useReducer hook for manage from condition
  const [todos, dispatch] = useReducer(inputReducer, []);
  // using useState hook for takeing input from
  const [input, setInput] = useState({
    name: "",
    type: "",
  });

  // set input value using useState
  const handelInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Get data form api
  const handelGetData = async () => {
    const response = await axios.get("http://localhost:7000/todos");
    dispatch({ type: "GET_DATA_FROM_SERVER", payload: response.data });
  };
  useEffect(() => {
    handelGetData();
  }, []);

  // handelSubmitForm
  const handelSubmitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:7000/todos", input);
    dispatch({ type: "GET_DATA_TO_SERVER", payload: response.data });
    setInput({
      name: "",
      type: "pending",
    });
    handelGetData();
  };

  // handelDeleted date from api
  const handelDeleted = async (id) => {
    const response = await axios.delete(`http://localhost:7000/todos/${id}`);
    dispatch({ type: "DELETED_DATA_FROM_SERVER", paylod: response.data });
    handelGetData();
  };

  // handel Filter date from server
  const handelFilterData = async (type) => {
    if (type === "all") {
      const response = await axios.get("http://localhost:7000/todos");
      dispatch({ type: "FILTER_DATA_FROM_SERVER", payload: response.data });
    } else {
      const response = await axios.get(
        `http://localhost:7000/todos?type=${type}`
      );
      dispatch({ type: "FILTER_DATA_FROM_SERVER", payload: response.data });
    }

    console.log("click");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          <div className="card">
            <div className="card-body">
              <form
                className="d-flex justify-content-between "
                action=""
                onSubmit={handelSubmitForm}
              >
                <div>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter Your name"
                    value={input.name}
                    onChange={handelInputChange}
                  />
                </div>
                <select name="type" id="" onChange={handelInputChange}>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Deleted">Deleted</option>
                </select>

                {/* <div className="mt-3">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={input.email}
                    onChange={handelInputChange}
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="form-control"
                    type="text"
                    name="pass"
                    placeholder="Enter our password"
                    value={input.pass}
                    onChange={handelInputChange}
                  />
                </div> */}
                <div className="">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handelFilterData("success")}
              >
                Success
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handelFilterData("pending")}
              >
                Pending
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handelFilterData("deleted")}
              >
                Deleted
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handelFilterData("all")}
              >
                All
              </button>
              {/* <label>
                <select name="" id="">
                  <option value="success">success</option>
                  <option value="pending">pending</option>
                  <option value="deleted">deleted</option>
                </select>
              </label> */}
              <hr />
              <div className="list">
                <ul className="border-1">
                  {todos.length == 0
                    ? "NO Data Found"
                    : todos.reverse().map((item, index) => (
                        <li
                          key={index}
                          className="d-flex mt-2 justify-content-between align-content-center"
                        >
                          <div>{item.name}</div>
                          <div
                            className="icon"
                            onClick={() => handelDeleted(item.id)}
                          >
                            <IoTrash />
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HokDetails;
