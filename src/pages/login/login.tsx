import React, { useState } from "react";
import "./login.css";
import logo_innoventis from "/src/assets/logo/logo_innoventis.jpeg";
import Input from "../../components/ui/input";
import EmailIcon from "../../icons/EmailIcon";
import { useAuth } from "../../hooks/useAuth";
import { createUser } from "../../api/users.api";
import { useI18n } from "../../context/AppContext";
import { useNavigate} from "react-router";

const Login = () => {

    const {translator} = useI18n();


    const { login } = useAuth();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");
    const [messageVisibility, setMessageVisibility] = useState<"visible" | "hidden">("hidden");

    const [action, setAction] = useState(translator("action_login"));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        console.log("handleLogin");

        try {

            await login({email, password});
            setMessage(translator("success_message_login"));
            setMessageType("success");
            navigate("/users");
            
        } catch (error) {
            setMessage(translator("error_message_login"));
            console.log(translator("error_message_login"));
            setMessageType("error");
        }
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        console.log("handleRegister");

        try {

            if (firstname && phone) {
                const data = {firstname, phone, email, password}
                await createUser(data);
                setMessageVisibility("visible");
                setMessage(translator("account_created_message"));
                setMessageType("success");
            }
            
        } catch (error) {
            setMessage(error);
            setMessageType("error");
        }
    }

    const handleFormSubmit = ["Login", "Connexion"].includes(action)
                            ? handleLogin
                            : handleRegister;



    return(

        <div className="container grid grid-cols-1 md:grid-cols-[0.7fr_0.8fr]">

            <div className="login">
                <div className={`message ${messageType}`}>
                    <label htmlFor="">{message}</label>
                </div>
                <div className="form-wrapper" style={{marginTop: ["Create your account", "Créer un compte"].includes(action) ? 0 : "10%" }}>
                    <div className="form-header">
                        <div className="titles">
                            <div className="title-login">{action}</div>
                            <p>{translator("welcome")}</p>
                        </div>
                    </div>
                    <form className="login-form" autoComplete="off" onSubmit={handleFormSubmit} >
                        { ["Create your account", "Créer votre compte"].includes(action) && (
                            <>
                                <Input 
                                    id="firstname"
                                    label={translator("firstname")}
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                                <Input
                                    id="phone"
                                    label= {translator("phone")}
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <Input 
                            id="log-email"
                            label={translator("email")}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        >
                            <EmailIcon size="18" strokeWidth="1.5" className="icon"/>
                        </Input>
                        <Input
                            id="log-password"
                            label={translator("password")}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="form-anchors">
                            <div className="anchor-1">
                                <input type="checkbox" id="remember-me"/>
                                <label htmlFor="remember-me">{translator("remember_me")}</label>
                            </div>
                            <div className="anchor-2">
                                <a href="#">{translator("forgot_password")}</a>
                            </div>
                        </div>
                        <div className="input-box">
                            <button className="btn-submit" id="SignInBtn" >{translator("sign_in")}<i className='bx bx-log-in'></i></button>
                        </div>
                       
                        { ["Login", "Connexion"].includes(action) ? (
                            
                            <>
                                <div className="switch-form">
                                    <span>{translator("dont_have_account")} <a href="#" onClick={ () => setAction(translator("action_create_account"))}>{translator("register")}</a></span>
                                </div>
                            </>
                        ): (

                            <>
                                <div className="switch-form">
                                    <span>{translator("back_to_login")}<a href="#" onClick={ () => setAction(translator("action_login"))}>{translator("login")}</a></span>
                                </div>
                            </>
                        )

                        }
                       
                    </form>
                </div>
            </div>

            <div className="logo-wrapper hidden lg:block">
                <div className="img-box">
                    <div className="img-item">
                        <img src={logo_innoventis} alt=""/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;
