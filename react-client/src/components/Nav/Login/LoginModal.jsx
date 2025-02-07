import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input, Row} from '@nextui-org/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { resetSigninState, signinUser } from '../../../redux/reducers/userSlice';
import styled from "styled-components";
import axios from "axios";
import jwt from 'jsonwebtoken'

import { useTranslation } from "react-i18next";

const StyledModal = styled(Modal)`
&.with-close-button.jsx-1754213264 {
  
    
}
.fields{
    margin-top:10px;
    margin-bottom:25px;

    &
    label{
      color: #000;

    }
   .jsx-4281389978 { // lo saque del html 
     width: 100%;
    }
    input.jsx-4281389978:-webkit-autofill, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:hover, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:active, input.jsx-4281389978:-webkit-autofill.jsx-4281389978:focus, textarea.jsx-4281389978:-webkit-autofill, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:hover, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:active, textarea.jsx-4281389978:-webkit-autofill.jsx-4281389978:focus {
    -webkit-box-shadow: 0 0 0 30px #fff inset !important;
    -webkit-text-fill-color: #000 !important;
}
   input{
     color:#000;
   }
   span{
     color: #000;
   }

.error{
    margin:0;
     margin-top: 3px;
     margin-left: 5px;
     color:#dc3545;
     font-size: 15px;
}
}
`;


const LoginModal = () => {
    const dispatch= useDispatch();
    const userState = useSelector(state => state.user);

    const {loggedInUser} =userState; 

    const error = useSelector(state => state.user.signinState.error);
   



    const [visible, setVisible] = useState(false);

    const { control, handleSubmit,reset, formState: { errors }} = useForm();

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
        reset({
            dni: "",
            username:"",
            password:""
        });
        dispatch(resetSigninState())
    };

    

    const history = useHistory();

    useEffect(() => {
        // setVisible(false)
        // if (loggedInUser){
        //     //redirect con el hook useHistory
            
        //     history.push("/home"); //esto me lleva hacia esta ventana

        // }
    },[loggedInUser,history])
  
// const token = JSON.parse(localStorage.getItem("token")).data

// const sendRecoverMail = async()=>{
//     await 
//     axios.get('http://localhost:3001/user/password-reset',{headers:{'Authorization':'Bearer ' + token}})
//   .then(response=> {
//    console.log(response)
   
//    }).catch(error=> console.log(error))
// }


 
  
 
  const onSubmit = async(data) => {
     try {
       const response= await dispatch(signinUser(data)).unwrap()
       if(response.status === "ok"){
         setVisible(false)
         history.push("/home")
       }
        
        
      } catch (error) {
        // handle error here
        /* .log(error) */
       let {status} = error
       if (status === "failed"){
         return <>
         <p>{error.error}</p>  
              </>
       }
      }
  }

  
  const { t, i18n } = useTranslation("global");

    return (
    
    <div>
       <Button auto ghost color="#2CA1DE"  onClick={handler}>
          {t("Nav.botton-modal")}   
        </Button> 
        <StyledModal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header className="modal-header">
                <Text id="modal-title" size="2em" color="#000" weight="bold">
                {t("Nav.botton-modal")}
               
                
                </Text>
            </Modal.Header>
           
            <form onSubmit={handleSubmit(onSubmit)}>

            <Modal.Body style={{ padding: '30px 20px' }}>
               
        <div  className="fields">
          <Controller
        className="fields"
        name="dni"
        rules={{ required: true, pattern: /^([0-9])*$/i , maxLength:9}}
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
      
        underlined 
       
        labelPlaceholder="DNI"
         color="#f5f5f5" {...field} />}
      />
      {errors.dni?.type === 'required' && <p className="error">DNI is required</p>}
      {errors.dni?.type === 'pattern' && <p className="error">Number characters only </p>}
      {errors.dni?.type === 'maxLength' && <p className="error"> DNI cannot be longer than 8 caracters or shorter than 7</p>}

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
       rules={{required:true}}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder={t("Nav.Username")}
         color="#f5f5f5" {...field} />}
      />
       {errors.username?.type === 'required' && <p className="error">This field is required</p>}
       {errors.username?.type === 'pattern' && <p className="error">Username should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter and one number</p>}

       </div>
       <div  className="fields">
          <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        rules={{required:true}}
        render={({ field }) => <Input.Password
           underlined 
           labelPlaceholder={t("Nav.Pass")}
           
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
      />
     {errors.password?.type === 'required' && <p className="error">This field is required</p>}
     {errors.password?.type === 'pattern' && <p className="error"> Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>}

     {error && <p className="error">{error.error}</p>}
            </div>
      
      
                <Row justify="space-between">
                <Link to="/user/recover">
                <Text size={14} color="#000" style={{ padding: '20px 0 0 0' }}>
                {t("Nav.Pass?")} 
                </Text>
                </Link>
                </Row>
            </Modal.Body>
            <Modal.Footer >
                <Button auto  onClick={closeHandler}>
                {t("Nav.close-modal")} 
                </Button>
                <Button color="#2CA1DE" auto type="submit">
                {t("Nav.singin-modal")}
                </Button>
            </Modal.Footer>
            </form>
        </StyledModal>
    </div>
    );    
    }

export default LoginModal
