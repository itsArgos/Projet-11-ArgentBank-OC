import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      token: null,
      isLogged: false,
    }
})

export default userSlice.reducer;