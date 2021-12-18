
import { createSlice } from '@reduxjs/toolkit'



const bookSlice = createSlice({
    name: 'stateContainer',
    initialState: {
        readingList: [],
        finishedList: [],
        user: null,
        isLoading: true,
        errorMsg: '',
        admin: false,
        Container:[],
        singleProduct:{},
        allProducts: [],
        page:0,
        size:10,
        pageCount:0,
        token:'',
        review: [],
        allOrders:[],
        pageRender:0, 
        singleUserProducts:[],
        allProductsToManage: [],
        singleProductToPay: {},
        paySuccess :'',
        payError :'',
        payProcessing:false,
        payClientSecret:'',
        stock:0,
        idToStock: '',

    },
    reducers: {
        addToReadingList: (state, { payload }) => {
            state.readingList.push(payload)
        },
        googleSignIn: (state, { payload }) => {
           state.user= payload;
        },
        googleLogOut: (state, { payload }) => {
            state.user= payload;
        },
        updateAuth: (state, { payload }) => {
            state.user= payload;
        },
        updateLoading: (state, { payload }) => {
            state.isLoading= payload;
         },
         setErrorMsg: (state, { payload }) => {
            state.errorMsg= payload;
         },
         setAdmin: (state, { payload }) => {
            state.admin= payload;
         },
         setContainer: (state, { payload }) => {
            state.Container= payload;
         },
         setSingleProduct: (state, { payload }) => {
            state.singleProduct= payload;
         },
         setAllProduct: (state, { payload }) => {
            state.allProducts= payload;
         },
         setPage: (state, { payload }) => {
            state.page= payload;
         },
         setPageCount: (state, { payload }) => {
            state.pageCount= payload;
         },
         setIdToken: (state, { payload }) => {
            state.token= payload;
         },
         setReview: (state, { payload }) => {
            state.review= payload;
         },
         setAllOrders: (state, { payload }) => {
            state.allOrders= payload;
         },
         setPageRender: (state, { payload }) => {
            state.pageRender= payload;
         },
         setSingleUserProducts: (state, { payload }) => {
            state.singleUserProducts= payload;
         },
         setAllProductsToManage: (state, { payload }) => {
            state.allProductsToManage= payload;
         },
         setSingleProductToPay: (state, { payload }) => {
            state.singleProductToPay= payload;
         },
         setPaySuccess: (state, { payload }) => {
            state.paySuccess= payload;
         },
         setPayError: (state, { payload }) => {
            state.payError= payload;
         },
         setPayProcessing: (state, { payload }) => {
            state.payProcessing= payload;
         },
         setPayClientSecret: (state, { payload }) => {
            state.payClientSecret= payload;
         },
         setStock: (state, { payload }) => {
            state.stock= payload;
         },
         setIdToStock: (state, { payload }) => {
            state.idToStock= payload;
         },
    },   
    
});

export const { addToReadingList, googleSignIn,googleLogOut,updateAuth,updateLoading,setErrorMsg, setAdmin, setContainer, setSingleProduct, setAllProduct, setPage, setPageCount, setIdToken, setReview, setAllOrders, setPageRender,setSingleUserProducts, setAllProductsToManage,setSingleProductToPay, setPaySuccess,setPayError, setPayProcessing,setPayClientSecret, setStock, setIdToStock } = bookSlice.actions;

export default bookSlice.reducer;