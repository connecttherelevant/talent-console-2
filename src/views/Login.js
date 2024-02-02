import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";

import {
  Button,
  FormGroup,
  Form,
  Input,
  Col,
  Container,
  Label,
} from "reactstrap";
import loginBg from "../assets/img/console_bg.jpg";
import loginImage from "../assets/img/MUSICIDIA_main_white.svg";
import { getOtp, verifyOtp } from "actions/loginAction";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  let loginData = useSelector((state) => state.loginData);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigation(`/admin/`);
    }
  }, [navigation]);

  const [formData, setFormData] = useState({
    contact_no: "",
    webOtpCode: "",
  });
  const [type, setType] = useState(0);

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    const formattedPhoneNumber = value.replace(/[^\d]/g, "");
    setFormData({ ...formData, [name]: formattedPhoneNumber });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      dispatch(getOtp(formData))
        .then((resp) => {
          alert.success(`OTP sent successfully`);
          setType(1);
        })
        .catch((err) => {
          alert.error(err.message);
        });
    } else {
      dispatch(verifyOtp(formData))
        .then((resp) => {
          alert.success(`OTP verified successfully`);
          setType(0);
          navigation("/admin/");
        })
        .catch((err) => {
          alert.error(err.message);
        });
    }
  };
  return (
    <>
      <div style={{ padding: "0", overflow: "none", display: "flex" }}>
        <Col
          style={{
            margin: "20px",
            height: "calc(100vh - 40px)",
            borderRadius: "12px",
            backgroundImage: `url(${loginBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            display: "flex",
            justifyConten: "center",
            alignItems: "center",
          }}
          md="4"
          className="d-flex justify-content-center align-content-center"
        >
          <img style={{ width: "50%" }} src={loginImage} alt="react-logo" />
        </Col>
        <Col
          md="8"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container>
            <h2>Get started</h2>

            <Form onSubmit={handleSubmit}>
              {!type ? (
                <FormGroup
                  style={{
                    width: "500px",
                  }}
                >
                  <Label for="name">Contact Number</Label>
                  <Input
                    type="text"
                    name="contact_no"
                    id="contact_no"
                    placeholder="Enter your number"
                    value={formData.contact_no}
                    onChange={handleInputChange}
                    maxLength={10}
                    required={true}
                  />
                </FormGroup>
              ) : (
                <FormGroup
                  style={{
                    width: "500px",
                  }}
                >
                  <Label for="otp">OTP</Label>
                  <Input
                    type="text"
                    name="webOtpCode"
                    id="otp"
                    placeholder="Enter OTP"
                    value={formData.webOtpCode}
                    onChange={handleInputChange}
                    maxLength={4}
                    required={true}
                  />
                </FormGroup>
              )}
              <Button color="info">Get OTP</Button>
            </Form>
          </Container>
        </Col>
      </div>
    </>
  );
};

export default Login;
