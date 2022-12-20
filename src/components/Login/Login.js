import LoginDefault from "./LoginDefault";
import LoginError from "./LoginError";
import cookie from 'react-cookies';
import { useState } from "react";
import axios from "axios";



export default function Login({setLogin}) {
    const [errorLogin, setErrorLogin] = useState(false);
    const login = {
        email: "",
        password: ""
    }

    function handleEmail(e) {
        login.email = e.target.value;
        //console.log(login.email);
    }
    function handlePassword(e) {
        login.password = e.target.value;
        //console.log(login.password);
    }
    function verification() {
        //console.log(login);
        axios.post("http://127.0.0.1:3001/verification", login).then((res) => {
            //console.log(res.data);
             if (res.data) {
                cookie.save("_id",res.data._id,{path:'/'});
                cookie.save("name",res.data.name,{path:'/'});
                cookie.save("role",res.data.role,{path:'/'});
                cookie.save("rtt",res.data.rtt,{path:'/'});                
                cookie.save("rttp",res.data.rttp,{path:'/'});
                cookie.save("cp",res.data.cp,{path:'/'});
                
                /* console.log(typeof(cookie.load("cp")));
                console.log(typeof(res.data.cp));
 */
                setLogin();
               
             }else{
                setErrorLogin(true);
             };
        });

    }

    //cookie.save("username","dijialei",{path:'/'});
    if (errorLogin) {
        return (
            <>
                <LoginError verification={() => verification()} handleEmail={(e) => handleEmail(e)} handlePassword={(e) => handlePassword(e)} />
            </>
        );

    } else {
        return (
            <>
                <LoginDefault verification={() => verification()} handleEmail={(e) => handleEmail(e)} handlePassword={(e) => handlePassword(e)} />
            </>
        );
    }
}