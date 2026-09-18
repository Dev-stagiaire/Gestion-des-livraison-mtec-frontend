import React, { useState } from "react";
import "../login/login.css";
import logo_mtec_telematics_noir from "/src/assets/logo/Logo_M-tec_Telematics_Noir.png";
import Input from "../../components/ui/input";
import { activateUserAccount } from "../../api/users.api";
import { useI18n } from "../../context/AppContext";
import { useNavigate } from "react-router";
import Notification  from "../../components/ui/notification";

const ActivateUserAccount = () => {

    const { translator } = useI18n();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "warning">();
    const [messageVisibility, setMessageVisibility] = useState<"visible" | "hidden">("hidden");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {

            const data = {
                password1: password1,
                password2: password2
            }
            const response = await activateUserAccount(token, data);
            // setMessage(translator("user-account-activate"));
            console.dir(response);
            setMessage(String(response.status));
            setMessageType("success");
            setMessageVisibility("visible");

            setTimeout(() => {
                navigate("/login");
            }, 10000);

        } catch (error) {
            setMessage(error.message);
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
                                <div className="title-login">{translator("activate_account")}</div>
                                <p>{translator("welcome")}</p>
                            </div>
                        </div>
                            <form className="login-form" autoComplete="off" onSubmit={handleLogin} >       
                                <Input
                                    id="password1"
                                    label={translator("password")}
                                    type="password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required
                                />
                                <Input
                                    id="password2"
                                    label={translator("password")}
                                    type="password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                />
                                <div className="input-box">
                                    <button className="btn-submit" id="SignInBtn" >{translator("register")}<i className='bx bx-log-in'></i></button>
                                </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ActivateUserAccount;
