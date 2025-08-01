import React, { Component,useState, useRef, useCallback, useEffect, Fragment } from 'react'
import { Row, Col, Modal, Button, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from 'react-select'
import AxiosMaster from '../shared/AxiosMaster';
import AxiosUser from "../shared/AxiosUser";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import Loader from '../shared/Loader'
import { Link, Redirect, useHistory } from 'react-router-dom';


const initialValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  company_name: "",
  password: "",
  isActive: ""
};
const validateForm = Yup.object().shape({
  firstname: Yup.string().required("Please enter first name"),
  lastname: Yup.string().required("Please enter last name"),
  email: Yup.string().email().required("Please enter valid email address"),
  mobile: Yup.string().required("Please enter valid mobile no"),
  company_name: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
  isActive: Yup.string().required("This field is required")
});


const CreateUsers = () => {

  const [userList, setUserList] = useState([]);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (values) => {
    setLoading(true)
      const postData = {
        "firstname": values.firstname,
        "lastname": values.lastname,
        "email": values.email,
        "mobile": values.mobile,
        "companyName": values.company_name,
        "userType": "USER",
        "uplineId":0,
        "password": values.password,
        "isActive": values.isActive
      }
      AxiosUser({
        method: "POST",
        url: `user-management/user`,
        data: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          setLoading(false)
          Swal.fire({
            title: 'Thank You',
            text: "User registration success.",
            icon: 'success',
          }).then(res =>{
            history.push("/users/userList")
          });
        })
        .catch(err => {
          setLoading(false)
          console.log("Err", err);
          let errorMsg = "Somethhing went wrong, please try again."
          if (err.data.errorMsg) {
            errorMsg = err.data.errorMsg;
          }
          Swal.fire({
            title: 'Oops!',
            text: errorMsg,
            icon: 'error',
          })
        });

  }

  const getSubscriptionList = () => {

    AxiosMaster({
      method: "GET",
      url: `masterdata-management/subscription/list`,    
    })
      .then(res => {
        setSubscriptionList(res.data.subscriptionList)
      })
      .catch(err => {
        setSubscriptionList([])
      });
  }

  useEffect(() => {
    getSubscriptionList()
  },[])


    return (
      <div>
        <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Users</a></li>
                <li className="breadcrumb-item active" aria-current="page"> <h3 className="page-title"> Create User </h3></li>
              </ol>
            </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">

                <Formik
                  initialValues={initialValues}
                  validationSchema={validateForm}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, setFieldValue, setFieldError, touched, isValid, handleSubmit, submitForm }) => {
                    return (
                      <Form >
                        
                        <div className="form-group">
                          <label><b>First Name</b></label>
                          <Field
                            name="firstname"
                            type="text"
                            className={`form-control ${touched.firstname && errors.firstname ? "is-invalid" : ""}`}
                            placeholder="First Name"
                            onChange={event => {
                              setFieldValue("firstname", event.target.value);
                            }}
                          />
                          {touched.firstname && errors.firstname && (<p className="error">{errors.firstname}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Last Name</b></label>
                          <Field
                            name="lastname"
                            type="text"
                            className={`form-control ${touched.lastname && errors.lastname ? "is-invalid" : ""}`}
                            placeholder="Last Name"
                            onChange={event => {
                              setFieldValue("lastname", event.target.value);
                            }}
                          />
                          {touched.lastname && errors.lastname && (<p className="error">{errors.lastname}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Email</b></label>
                          <Field
                            name="email"
                            type="text"
                            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                            placeholder="Email Address"
                            onChange={event => {
                              setFieldValue("email", event.target.value);
                            }}
                          />
                          {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Mobile</b></label>
                          <Field
                            name="mobile"
                            type="text"
                            className={`form-control ${touched.mobile && errors.mobile ? "is-invalid" : ""}`}
                            placeholder="Mobile No"
                            onChange={event => {
                              setFieldValue("mobile", event.target.value);
                            }}
                          />
                          {touched.mobile && errors.mobile && (<p className="error">{errors.mobile}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Password</b></label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                            placeholder="Password"
                            onChange={event => {
                              setFieldValue("password", event.target.value);
                            }}
                          />
                          {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Company Name</b></label>
                          <Field
                            name="company_name"
                            type="text"
                            className={`form-control ${touched.company_name && errors.company_name ? "is-invalid" : ""}`}
                            placeholder="Company Name"
                            onChange={event => {
                              setFieldValue("company_name", event.target.value);
                            }}
                          />
                          {touched.company_name && errors.company_name && (<p className="error">{errors.company_name}</p>)}
                        </div>
                        <div className="form-group">
                        <label><b>Status</b></label>
                          <Field
                            name="isActive"
                            component="select"
                            className={`form-control ${touched.isActive && errors.isActive ? "is-invalid" : ""}`}
                            autoComplete="off"      
                            onChange={event => {
                              setFieldValue("isActive", event.target.value);
                            }}
                          >
                                <option value="" >Please Select</option>
                                <option value="Y" >ACTIVE</option>
                                <option value="N" >IN-ACTIVE</option>
                               
                            {touched.isActive && errors.isActive && (<p className="error">{errors.isActive}</p>)}
                          </Field>   
                        </div>
                       
                        <button type="submit" onClick={(event) => {
                          event.preventDefault();
                          handleSubmit();
                        }} className="btn btn-primary">Create Account</button>
                      </Form>
                    )
                  }
                  }
                </Formik>

                </div>
              </div>
            </div>
          </div>
         
        </div>
        {loading ? <Loader/> : null }
      </div>
    )

}

export default CreateUsers
