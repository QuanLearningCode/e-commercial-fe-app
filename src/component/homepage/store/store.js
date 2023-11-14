import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialStatePopup = {
  showPopup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialStatePopup,
  reducers: {
    show_popup: (state) => {
      state.showPopup = true;
    },
    hide_popup: (state) => {
      state.showPopup = false;
    },
  },
});

//---------------------------------

const initialStateFilter = {
  category: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialStateFilter,
  reducers: {
    filter_product: (state, action) => {
      state.category = action.payload;
    },
  },
});

// export const fetchQuantity = createAsyncThunk(
//   "quantity/fetchQuantity",
//   async () => {
//     const response = await axios({
//       url: "http://localhost:5000/products/cart",
//       method: "GET",
//       withCredentials: true,
//     });
//     return response.data.cart;
//   }
// );

const initialQuantity = {
  quantity: [],
  loading: false,
};

const quantitySlice = createSlice({
  name: "quantity",
  initialState: initialQuantity,
  reducers: {
    addCart: (state, action) => {
      state.quantity = action.payload;
    },
    increase_quantity: (state, action) => {
      const productIndex = state.quantity.findIndex(
        (product) => product.productId._id === action.payload
      );

      state.quantity[productIndex].quantity =
        state.quantity[productIndex].quantity + 1;
    },
    decrease_quantity: (state, action) => {
      const productIndex = state.quantity.findIndex(
        (product) => product.productId._id === action.payload
      );

      if (state.quantity[productIndex].quantity > 1) {
        state.quantity[productIndex].quantity =
          state.quantity[productIndex].quantity - 1;
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchQuantity.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchQuantity.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.quantity = action.payload;
  //     });
  // },
});

//---------------------------------

const initialNavShopPageClicked = {
  categoryClicked: "all",
};

const navShopPageClickedSlice = createSlice({
  name: "navShopPageClicked",
  initialState: initialNavShopPageClicked,
  reducers: {
    nav_click: (state, action) => {
      state.categoryClicked = action.payload;
    },
  },
});

//---------------------------------

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    filter: filterSlice.reducer,
    quantity: quantitySlice.reducer,
    navShopPageClicked: navShopPageClickedSlice.reducer,
  },
});

export const popupActions = popupSlice.actions;
export const filterActions = filterSlice.actions;
export const quantityActions = quantitySlice.actions;
export const navShopPageClickedActions = navShopPageClickedSlice.actions;

export default store;
