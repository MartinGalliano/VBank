import React, {useState, useRef, useEffect}from 'react'
import styled from "styled-components"
import { Button, Text, Input, Modal, Card,Grid, Spacer, Container} from '@nextui-org/react';
import axios from 'axios' 
import success from "../../img/success.gif"
import {toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'

import { useTranslation } from "react-i18next";
  
  
  const ContainerS= styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 450px;
  width:100%;
  background-color: white;
  border-radius: 10px;
  /* padding:0px 30px */
  
  `

const MaxContainer=styled.div`
height: 500px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 40%;
padding:0px 30px
`

const TitleContainer= styled.div` 
  position:relative;
  left:130px;
  top:-50px;
  @media screen and (max-width:1100px){
  display:none
  }
`
const ToContainer= styled.div`
margin-top:10px;
margin-bottom: 10px;
padding: 5px;

`
const MoneyContainer = styled.div`
margin-top:10px;
margin-bottom: 10px;
padding: 5px;


`
const DetailContainer = styled.div `
margin-bottom: 10px;
margin-top:30px;
padding: 5px;
width:300px;
`
const ButtonContainer = styled.div`
margin-left:155px;
padding: 5px;

`
const DivCheck = styled.div`
display: flex;
justify-content: center;
align-items: center;

`


const BoderShadow = styled.div`
  border:solid 0.5px #03030349;
  border-radius:10px;
  display:flex;
  justify-content :center;
  padding: 0px 30px;
  width:30%;
  overflow:hidden;
  -webkit-box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0);
  @media screen and (max-width:1100px){
    width:100%;
    box-shadow:none;
    -webkit-box-shadow:none;
    border:none;
  }
`;

const Expeses = styled.div`
  display:flex;
  flex-direction:column;
  border-radius:20px;
  width: 90%;
  height: 320px;
  
`;

const DateNameTotal = styled.div`
  padding-top: 15px;
  margin-bottom:10px;
  display:flex;
  justify-content:space-around;
  width: 100%;
  height:50px;
`;

const LatestMovements = styled(Grid.Container)`
  color:black;
  width:100%;
  padding-bottom:10px;
  @media screen and (max-width: 1100px) {
    width:100%;
  }
`;

const GridLatestMovents = styled(Grid)`
  border-radius:10px;
  
`;

const GridContainer = styled.div`
  border-radius:10px;
  height:100%;
  width:100%;
  overflow:auto;
  overflow-x:hidden;
  
`;

export default function FixedTerm() {

  let myHistory = useHistory()
   
    const [info, setInfo] = useState()
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        setError('')
     
    }
    
    const defaultForm = {
      amount: 0,
      due: '',
      total:0
    }

    const [state, setState] = useState(defaultForm)
    const [error,setError] = useState('')
   const [status, setStatus] =useState(0)
   const [btnLoading, setBtnLoading] = useState(false)

  
    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
      } 
      function handleAmount(e){
        setState({
            ...state,
            amount: parseInt(e.target.value)
        })
      }


      let date1 = new Date();  
      let date2 = new Date (state.due);  

      //calculate total number of seconds between two dates  
      var total_seconds = Math.abs(date2 - date1) / 1000;  

      //calculate days difference by dividing total seconds in a day  
      var days_difference = Math.floor (total_seconds / (60 * 60 * 24));  
       
      let monto=parseFloat(state.amount)

      let rate37 = ((37/365) * (days_difference))/100
      let rate37xdays= ((parseFloat(state.amount)*rate37))
      let rate37Total = (rate37xdays + monto).toFixed(2)

    
      
       useEffect(() => {
        
          setState({
            ...state,
            total:parseInt(rate37Total)
          })
      
      }, [rate37Total]) 
    
      const token = JSON.parse(localStorage.getItem("token")).data
      
      
      useEffect(()=>{
        axios.get("http://localhost:3001/fixedDeposit" , {headers:{'Authorization':'Bearer ' + token}} )
        .then(response=> {
          
          setInfo(response.data.fixedDeposits)
          
          
          
          }).catch(error=>{
            
             console.log(error)
          })
      },[])
        
      

       function handleSubmit(e){
        e.preventDefault()
        setBtnLoading(true)
        axios.post('http://localhost:3001/fixedDeposit/new', state, {headers:{'Authorization':'Bearer ' + token}})
        .then(response=> {
          console.log(response)
          setStatus(response.status)
          console.log(response.status)
          setBtnLoading(false)
          
          }).catch(error=>{
            setError(error.response.data.data)
            setStatus(error.response.data.status)
            setBtnLoading(false)
            if (error.response.data.data === "Unauthorized"){
              
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
            }
             
          })
         }
        
        function HandleCloseSucces(e){
          e.preventDefault()
          setState(defaultForm)
          closeHandler()
          myHistory.push("/home")
        }

const { t, i18n } = useTranslation("global");
    
return (
      
      <div style={{display:"flex",justifyContent:"center"}}>

       <Grid.Container display="flex" justify="center" style={{marginTop:"150px" }}>
      
      
       <TitleContainer>
          <Text h3 > {t("Fixed.tern")} </Text>
        </TitleContainer>
         <BoderShadow>
         <MaxContainer>   
         <form >
         <ContainerS style={{overflow:"hidden"}} >
          <ToContainer>
            <Text >How much?</Text>
            <Input name="amount" type="number" min="1"  step="0.01" value={state.amount} contentClickable="true" onChange={(e)=>handleAmount(e)}  width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text>How long?</Text>
           <Input name="due" value={state.due} type="date"  width="300px" onChange={(e)=>handleChange(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
       <Card width="300px"  color="#f3f3f3" bordered borderColor="#D8DBE2" >
           <Text  >{t("Fixed.interest")} rate: </Text>
           <Text >{t("Fixed.from")} </Text>
          
        </Card>
       
       </DetailContainer>   
 
       
       <ButtonContainer>
       <Button disabled={!state.amount||!state.due} onClick={handler} rounded="Primary" color="#2CA1DE" size="small">{t("Fixed.calculate")}</Button>   
       </ButtonContainer> 

       
       <Modal  
         
         preventClose 
         aria-labelledby="modal-title"
         open={visible}
         onClose={closeHandler}>
      
      {
         status !== 200 ?
         <>
         <Modal.Header>
 
           <Text  h3>{t("Fixed.before")}</Text>
         </Modal.Header>
        
        <Modal.Body> 
         
         <Text >{t("Fixed.how-much")} {` $ ${state.amount}`} </Text>
         <Text >{t("Fixed.due-date")} {` ${state.due}`} </Text>
          <Text>{t("fixed.interest2")}</Text>
         <Text > period: {` ${days_difference} days`}</Text>
         <Text color="#2CA1DE" size="20px"> Total credit: {`$ ${rate37Total}`} </Text>
         
        </Modal.Body>
       
        <Modal.Footer>
        { error?.length > 1  ? 
            <>
            <Text color="red">{error}</Text>
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            {t("Nav.close-modal")}
            </Button>
            <Button auto rounded="Primary" loading={btnLoading} color="#2CA1DE" onClick={(e)=>handleSubmit(e)}>
            Ok!
            </Button>
            </>
            :
            <>
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            {t("Nav.close-modal")}
            </Button>
            <Button auto rounded="Primary" loading={btnLoading} color="#2CA1DE"  onClick={(e)=>handleSubmit(e)}>
            Confirm!
            </Button>
            
            </>
            }
          </Modal.Footer>
          </>
          :
          <>
          <DivCheck>
          <img src={success} alt='loading gif' />
          </DivCheck>
          
          <Button  color="#2CA1DE" onClick={(e)=> HandleCloseSucces(e) }> Ok! </Button>
          
          </>
          }  
          </Modal>
          </ContainerS>
      
       </form>
       </MaxContainer>
       </BoderShadow>

 {/*       <TextS>Latest movements</TextS>
        <BoderShadow style={{height:"350px"}} >
          <Expeses>
            <DateNameTotal>
            <LatestMovements gap={2} justify="space-between">
                <Spacer x={4} />
                <GridLatestMovents xs={2}>Date</GridLatestMovents>
                <Spacer x={-5}/>
                <GridLatestMovents justify="center" xs={4}>Initial amount</GridLatestMovents>
                <Spacer x={1}/>
                <GridLatestMovents xs={1}>Total</GridLatestMovents>
                <Spacer x={2} />
              </LatestMovements>     
            </DateNameTotal>
              <Divider x={0} y={1} />
              <GridContainer >
              {info?.map((e, i) => {
               
                  return (
                <LatestMovements key={i} gap={2} justify="space-between" style={{marginBottom:"10px"}}>
                <Spacer x={3} />
                <GridLatestMovents xs={2}>{` ${e.finishDate.slice(0,10)} `} </GridLatestMovents>
                <Spacer x={-4}/>
                <GridLatestMovents justify="center" xs={4}>{`$ ${e.amount} `} </GridLatestMovents>
                <Spacer x={1}/>
                <GridLatestMovents xs={1}>{ `$ ${e.total}` } </GridLatestMovents>
                <Spacer x={2} />
                <Divider x={0} y={0} />
              </LatestMovements>
                  )
                
                
              }
              )}

              </GridContainer>
              </Expeses>
        </BoderShadow>
 */}
      
      
        <Spacer y={3}/>
      
        </Grid.Container>
      </div>
    )
}

