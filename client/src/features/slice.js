import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  token: token,
  user: user ? JSON.parse(user) : null,
  showAlert: false,
  isLoading: false,
  alertText: "",
  alertType: "",
  specialProducts: "",
  cart: "",
};

function addUserToLocalStorage({ user, token }) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}
function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUsertoMenu());
  removeUserFromLocalStorage();
};

export const addToCart = () => async (dispatch) => {};

export const allSpecialProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/allspecialproducts");
    dispatch(getSpecialProducts(data));
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};
export const uploadProduct = (productData) => async (dispatch) => {
  try {
    dispatch(uploadProductBegin());
    console.log(productData);
    const { data } = await axios.post("api/uploadproduct", {
      productName: productData.productName,
      price: parseInt(productData.price),
      discount: parseInt(productData.discountPrice),
      productDescription: productData.productDescription,
      productImage: productData.productImage,
      isSpecial: productData.isSpecial,
    });
    dispatch(uploadProductSuccess());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};
export const registerUser = (memberData) => async (dispatch) => {
  try {
    dispatch(registerUserBegin());

    const { data } = await axios.post("api/signup", {
      name: memberData.name,
      email: memberData.email,
      password: memberData.password,
    });

    dispatch(RegisterUserSuccess());
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(loginUserBegin());
    const { data } = await axios.post("api/signin", {
      email: loginData.email,
      password: loginData.password,
    });

    dispatch(loginUserSuccess(data));
    addUserToLocalStorage(data);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  } catch (error) {
    // dispatch({ msg: error.response.data.Error });
    console.log(error);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  }
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    getSpecialProducts: (state, action) => {
      return {
        ...state,
        specialProducts: action.payload,
      };
    },
    uploadProductBegin: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Upload Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    uploadProductSuccess: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Product Uploaded",
        alertType: "success",
        isLoading: false,
      };
    },
    registerUserBegin: (state) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Register Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    RegisterUserSuccess: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Register Success",
        alertType: "success",
        isLoading: false,
      };
    },
    loginUserBegin: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Login Begin",
        alertType: "success",
        isLoading: true,
      };
    },
    loginUserSuccess: (state, action) => {
      return {
        ...state,
        showAlert: true,
        alertText: "Login Success",
        alertType: "success",
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    clearAlert: (state, action) => {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    },
    logoutUsertoMenu: (state, action) => {
      return {
        ...state,
        token: null,
        user: null,
        userLocation: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUserBegin,
  loginUserSuccess,
  clearAlert,
  logoutUsertoMenu,
  uploadProductBegin,
  uploadProductSuccess,
  registerUserBegin,
  RegisterUserSuccess,
  getSpecialProducts,
} = stateSlice.actions;
export const selectCount = (state) => state.counter;

export default stateSlice.reducer;
