import React, { useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import {Link } from "react-router-dom"
import styled from 'styled-components'
import Logos from "../../img/Logos.png"
import {Home} from "@styled-icons/boxicons-solid/Home"
import {DollarCircle} from "@styled-icons/boxicons-solid/DollarCircle"
import {Menu} from "@styled-icons/boxicons-regular/Menu"
import {UserCircle} from "@styled-icons/fa-solid/UserCircle"
import {LogOut} from "@styled-icons/boxicons-regular/LogOut"
import { Spacer, Text , Grid, Col,Row} from "@nextui-org/react"
import { logoutUser } from '../../redux/reducers/userSlice'
import { BuildingRetailMoney } from "@styled-icons/fluentui-system-filled/BuildingRetailMoney"
import {PiggyBankFill} from "@styled-icons/bootstrap/PiggyBankFill"
import { useMediaQuery } from 'react-responsive'

import { useTranslation } from "react-i18next";


const SideNav = styled.div`
  display:flex;
  position:fixed;
  overflow:hidden;
  flex-direction:column;
  align-items:center;
  flex-direction: flex-start;
  width:80px;
  height: 200vh;
  background-color:#95BEFE;
  margin:0px;
  padding:0px;
  transition: all 700ms;
  z-index:200;

  @media screen and (max-width: 1080px){
    width:0px;
  }
  
  &:hover{
    width:220px
  }

  `; 
const LogoMenu = styled.img`
  margin-top:30px;
  width:50px;
  height: 40px;
  `;

const IconHome = styled(Home)`
  color: #f5f5f5;
  width:30px;
  height:30px;
`;
const TextIcons = styled(Text)`
  color:white;
  display:flex;
  flex-wrap:nowrap;
  width:300px;
  color:#bdbdbd;
  &:hover{
    color:white;
  };
  
`;
const IconCashCoin = styled(DollarCircle)`
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconCharge = styled(BuildingRetailMoney)`
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconUser = styled(UserCircle)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:30px;
  height:30px;
`;
const IconPiggy = styled(PiggyBankFill)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconLogOut = styled(LogOut)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:30px;
  height:30px;

`;
const LinkIcons = styled(Link)`
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  width:500px;


  &:hover {
    color:black;
    
  }

`;
const IconMenu = styled(Menu)`
  color: #f5f5f5;
  width:40px;
  height:40px;
`;

const NavResponsive = styled(Grid.Container)`
  width:100vmax;
  padding:30px; 
  background-color: #95BEFE;
  position:relative;
  margin:50px;
  justify-content:space-between;
  z-index:500;
  display:none;
  margin-bottom:100px;

`;
  
console.log(window.screen.width)

export default function Sidebar() {
const dispatch = useDispatch()
const [navOpen, setNavOpen] = useState(false)
const logOut = ()=> {
  dispatch(logoutUser())
  
}

  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
  const isPortrait = useMediaQuery({ query: '(max-width: 480px)' })
  
  const { t, i18n } = useTranslation("global");


  return (
  <>
   
        <SideNav style={{width:(navOpen && "300px")}}>
          
          <LogoMenu src={Logos} />
          <Spacer y={7}/>
          <Grid.Container >
            <Col offset={3.5}>

              <Row align="center" >
              <LinkIcons  to="/home"><IconHome/>
                <Spacer x={1.5}/>
                <TextIcons color="#f5f5f5;">{t("Side.home")}</TextIcons>
              
              </LinkIcons>
              </Row>
           <Spacer y={2}/>  
            <Row class="iconos"  align="center">
             <LinkIcons to="/home/transfer"><IconCashCoin/>
             <Spacer x={1.2}/>
            <TextIcons color="#f5f5f5;">{t("Side.transfer")}</TextIcons>
            </LinkIcons>
            </Row>
          <Spacer y={2}/>
            <Row>
            <LinkIcons to="/home/charge"><IconCharge/>
            <Spacer x={1.2}/>
            <TextIcons color="#f5f5f5;">{t("Side.change")}</TextIcons>
            </LinkIcons>
            </Row>
          <Spacer y={2}/>
            <Row>
             <LinkIcons to="/fixedTerm"><IconPiggy /> 
             <Spacer x={1.3}/>
              <TextIcons color="#f5f5f5;">{t("Side.fixed-Term")}</TextIcons>
              </LinkIcons>
            </Row>
            <Spacer y={2}/> 
            <Row>
             <LinkIcons to="/user/profile"><IconUser /> 
             <Spacer x={1.4}/>
              <TextIcons color="#f5f5f5;">{t("Side.profile")}</TextIcons>
              </LinkIcons>
            </Row>
            <Spacer y={2}/> 
            <Row wrap="nowrap">
               <LinkIcons to="/"><IconLogOut  onClick={logOut}/> 
               <Spacer x={1.4}/>

               <TextIcons  color="#f5f5f5;">{t("Side.log-Out")} </TextIcons>
               </LinkIcons>

            </Row>

          </Col>
         
         </Grid.Container>
        </SideNav>

        {isTabletOrMobile && 
        
        <NavResponsive  >
            
                
        <Grid >
          <img src={Logos} alt="" style={{marginLeft:"20px"}} />
        </Grid>
        <Grid >
          <IconMenu onClick={()=>{setNavOpen(!navOpen)}} style={{marginRight:"20px"}} />
        </Grid>

      </NavResponsive>
      }
        
      

    </>
  )
}
