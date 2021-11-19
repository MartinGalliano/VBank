import React, {useState}from "react";
import { useForm, Controller } from "react-hook-form";

import {useDispatch} from "react-redux"
import { Modal, Button, Input} from '@nextui-org/react';
import { useHistory} from 'react-router';
import styled from "styled-components";
import Nav from "../../components/Nav/Nav"
import axios from "axios"
import { useTranslation } from "react-i18next";
import successEmail from "../../img/successEmail.gif"


const PageContainer= styled.div`
width: 100%;
height 100vh;
display:flex;
flex-direction:column;
align-items:center;

`;


const Box= styled.div`
margin:auto 0;
width: 50%;
height: 60%;
background-color: white;
border-radius: 20px;
display: flex;
flex-direction:column;
padding: 0 15px;
-webkit-box-shadow: -10px 0px 13px -7px #00000052,
    10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052,
    5px 5px 15px 5px rgba(0, 0, 0, 0);

#title{
margin-top: 20px;
margin-bottom:25px;
	h2{
		font-size: 24px;
		text-align:center;
	}
}
span{
	text-align:center;
}

form{
	margin-top: 20px;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:flex-start;
	height: 80%;
}
.field{
	display: flex;
	flex-direction:column;
	align-items: center;

	width: 60%;
	margin-top 20px;
	margin-bottom 30px;
	
	.jsx-4281389978 {
		width: 100%;

	}
	.error{
		color:red;
		font-size: 15px;
	}
	.success{
		color: green;
		font-size: 15px;

	}
}

#btns{
	width:100%;
	display:flex;
	justify-content:center;
	margin-top: 35px;
	button{
		width: 60%;
		border-radius 20px;
	}
}
`;


const RecoverPass =()=>{

	 const { control, handleSubmit,formState: { errors }} = useForm();
	 const [error, setError] = useState("")
	 const [msg, setMsg] = useState("");
	 const history = useHistory()

	  const [visible, setVisible] = useState(false);
	  const handler = () => setVisible(true);
  const closeHandler = () => {
      setVisible(false);
      setError('');
   
  }

	 const onSubmit = async(data) => {
	 	console.log(data)
     axios.post('http://localhost:3001/user/password-reset', data)
  .then(response=> {
   console.log(response)
   if(response.data.status === "ok") {
   	setMsg(response.data.data)
   	setVisible(true)
   }
   
   
   }).catch(error=>{
   	console.log(error)
     setError(error.response.data.data)
   
     
     /*if (error.response.data.data === "Unauthorized"){
       localStorage.removeItem('token')
       toast.error(`Session expired, you must sign in again`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => ( window.location.href = 'http://localhost:3000/'  ), 
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        }); 
     }*/
    
   })
  }
  const handleClick=()=>{
  		history.push("/")
  }

  const { t } = useTranslation("global");

	return(
		<PageContainer>
		<Nav/>
		<Box>
		<div id="title">
		<h2> {t("Nwpass.1")}</h2>
		</div>
		<span>
		{t("Nwpass.2")}
		</span>
		 <form onSubmit={handleSubmit(onSubmit)}>
		<div  className="field">
          <Controller
        className="fields"
        name="email"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Email"
         color="#f5f5f5" {...field} />}
      />
      {errors?.email?.type === "required" && <p className="error">{t("Prof.err")}</p>}
      {errors?.email?.type === "pattern" && (
        <p className="error">{t("Sign.err2")}</p>
      )}
       { error && (
        <p className="error">{error}</p>
      )}
  {/*     { msg && (
       	<Modal
       	closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
       	>
       	 <img src={successEmail} alt='loading gif' />
       	</Modal>
       

      )}*/}
        	<Modal
       	closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
       	>
       	  <img src={successEmail} alt='loading gif' />
       	</Modal>
            </div>
		<div id="btns">

			<Button auto flat color="error" onClick={handleClick}>
			{t("Home.CANCEL")}
                </Button>
                <Button auto type="submit">
				{t("Home.Send")}

                </Button>
		</div>
		</form>
		</Box>
		</PageContainer>
		)
}

export default RecoverPass;