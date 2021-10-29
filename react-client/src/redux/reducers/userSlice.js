import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios' 



const userInfoString= localStorage.getItem('token');
const currentUserInfo= userInfoString ? JSON.parse(userInfoString) : null; 
// si hay un infoString, lo vuelvo a convertir a obj porque lo necesito asi, si no, quiere decir que  no hay un usuario registrado

const initUserState={
    loggedInUser:currentUserInfo, // lo hago asi para que pueda ser nulo  o mantenga cualquier info de usuario
    registerState: {loading: "idle", error:null, currentRequestID: undefined}, //para asegurarme que no haya multiples request desde un mismo usuario
    signinState: {loading: "idle", error:null, currentRequestID: undefined},
    
}

export const registerUser= createAsyncThunk("user/register", async (userInfo,thunkAPI)=>{
    //manejo de errores antes de hacer la peticion
    const {loading, currentRequestID} = thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID){
        return
    }
    try { 

        const response = await axios.post('http://localhost:3001/user/register', userInfo)
    
      /*   localStorage.setItem('token', JSON.stringify(response.data.token)) 
        //cambie "token" por "token" y "response.data.data" por "response.data.token" */
        return response.data;
        
    } catch (error) {
        const {rejectWithValue}= thunkAPI;
        return rejectWithValue(error.response.data);
    }
})


export const signinUser= createAsyncThunk("user/login", async (userInfo,thunkAPI)=>{
    //manejo de errores
    const {loading, currentRequestID} = thunkAPI.getState().user.signinState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID){
        return
    }
    try { // hago la llamada a la API to /register
        const response = await axios.post("http://localhost:3001/user/login", userInfo)
        //aca uso el local storage para mantener al usuario 
        // como el response es un objeto, lo tengo que stringifiar
        localStorage.setItem('token', JSON.stringify(response.data))
   
        return response.data;
        
    } catch (error) {
        const {rejectWithValue}= thunkAPI;
        return rejectWithValue(error.response.data);
    }
})


const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {// no necesito escribir funciones para los actions creator porque create Slice crea las accjiones automaticamente para cada reduce
      logoutUser: (state) => {
          state.loggedInUser = null;
          localStorage.removeItem('token');
      },
     
  },
  extraReducers: {
      [registerUser.pending]: (state,action)=>{
      const {registerState} = state;
      if(registerState.loading === "idle"){
          registerState.loading = "pending"
          registerState.currentRequestID = action.meta.requestId
      }
      },
      [registerUser.fulfilled]: (state,action)=>{
          const {registerState} = state;
          if(registerState.loading === "pending"){
              registerState.loading = "idle"
              registerState.currentRequestID = undefined;
              registerState.error= null;
              state.loggedInUser= action.payload
          }
          },
      [registerUser.rejected]: (state,action)=>{
          const {registerState} = state;
          if(registerState.loading === "pending"){
              registerState.loading="idle"// seteo el loading como terminado
              registerState.currentRequestID = undefined;
              registerState.error = action.payload; //envio el error
          }
      },
      [signinUser.pending]: (state,action)=>{
        const {signinState} = state;
        if(signinState.loading === "idle"){
            signinState.loading = "pending"
            signinState.currentRequestID = action.meta.requestId
        }
        },
        [signinUser.fulfilled]: (state,action)=>{
            const {signinState} = state;
            if(signinState.loading === "pending"){
                signinState.loading = "idle"
                signinState.currentRequestID = undefined;
                signinState.error= null;
                state.loggedInUser= action.payload
            }
            },
        [signinUser.rejected]: (state,action)=>{
            const {signinState} = state;
            if(signinState.loading === "pending"){
                signinState.loading="idle"// seteo el loading como terminado
                signinState.currentRequestID = undefined;
                signinState.error = action.payload; //envio el error
            }
        },
     
      
  
  }
})


export const {logoutUser} = userSlice.actions;
export default  userSlice.reducer;




/* const {dni, username, password} = req.body */