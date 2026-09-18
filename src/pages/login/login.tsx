import React, { useState } from "react";
import "./login.css";
import logo_mtec_telematics_noir from "/src/assets/logo/Logo_M-tec_Telematics_Noir.png";
import Input from "../../components/ui/input";
import Notification from "../../components/ui/notification";
import EmailIcon from "../../icons/EmailIcon";
import { useAuth } from "../../hooks/useAuth";
import { useI18n } from "../../context/AppContext";
import { useNavigate } from "react-router";

const Login = () => {

    const { translator } = useI18n();


    const { login } = useAuth();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "warning">();
    const [messageVisibility, setMessageVisibility] = useState<"visible" | "hidden">("hidden");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        console.log("handleLogin");

        try {

            await login({ email, password });
            setMessage(translator("success_message_login"));
            setMessageType("success");
            setMessageVisibility("visible");

            setTimeout(() => {
                navigate("/users");
            }, 5000);

        } catch (error) {
            setMessage(translator("error_message_login"));
            setMessageType("error");
            setMessageVisibility("visible");
        }
    }



    return (

        <div className="container grid grid-cols-1 md:grid-cols-[0.9fr_0.6fr]">

            {messageVisibility === "visible" && (
                <Notification
                    message={message}
                    type={messageType}
                    onClose={() => setMessageVisibility("hidden")}
                />
            )}

            <div className="logo-wrapper px-24 hidden lg:block">
                <div className="img-box">
                    <h1 className="text-5xl text-white app-text">M-DELIVERY</h1>
                </div>
                <div className="relative flex items-center justify-center">
                    <p className="text-left text-gray-100 opacity-80">
                        {translator("app_description")}
                    </p>
                </div>
                <p className="absolute text-xs text-left bottom-10 text-gray-200 opacity-50">© 2026 M-DELIVERY. All rights reserved</p>
            </div>

            <div className="login">
                <div className="form-wrapper">
                    <div className="logo-wrapper w-25 !bg-white ">
                        <div className="img-item">
                            <img src={logo_mtec_telematics_noir} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="form-header">
                            <div className="titles">
                                <div className="title-login">{translator("login")}</div>
                                <p>{translator("welcome")}</p>
                            </div>
                        </div>
                            <form className="login-form" autoComplete="off" onSubmit={handleLogin} >       
                                <Input
                                    id="log-email"
                                    label={translator("login")}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                >
                                    <EmailIcon size="18" strokeWidth="1.5" className="icon" />
                                </Input>
                                <Input
                                    id="log-password"
                                    label={translator("password")}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="input-box">
                                    <button className="btn-submit" id="SignInBtn" >{translator("sign_in")}<i className='bx bx-log-in'></i></button>
                                </div>

                                <div className="switch-form">
                                    <div className="anchor-2">
                                        <a href="#">{translator("forgot_password")}</a>
                                    </div>
                                </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;
