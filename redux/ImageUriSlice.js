import { createSlice } from '@reduxjs/toolkit';

const ImageUriSlice = createSlice({
    name: 'ImageUriSlice'
    , initialState: {

        InputImageUri: '',
        InputImageResponse: {},
        CustomInputImageName: {},
        OutputImageUri: '',
        UserInputImagesArray: [],
        UserImageUri: ''

    },
    reducers: {
        resetEveryImageState(state, actions) {
            state.CustomInputImageName = '';
            state.InputImageResponse = {};
            state.InputImageUri = '';
            state.OutputImageUri = '';
            state.UserImageUri = '';
            state.UserInputImagesArray = [];
        },

        setUserImageUri: (state, actions) => {
            state.UserImageUri = actions.payload.UserImageUri;
            console.log("User Profile Image Uri Set:", actions.payload.UserImageUri);
        },
        setInputImageUri: (state, actions) => {
            state.InputImageUri = actions.payload.ImageUri;
            state.OutputImageUri = actions.payload.ImageUri;
        },
        removeInputImageUri: (state, actions) => {
            state.InputImageUri = '';
        },

        setInputImageResponse: (state, actions) => {
            state.InputImageResponse = actions.payload.ImageResponse;
        },
        removeInputImageResponse: (state, actions) => {
            state.InputImageResponse = {};
        },

        setOutputImageUri: (state, actions) => {
            state.OutputImageUri = actions.payload.ImageUri;
        },
        removeOutputImageUri: (state, actions) => {
            state.OutputImageUri = '';
        },
        setCustomInputImageName(state, actions) {

            state.CustomInputImageName = actions.payload.FileNameAndExtensionObject;
            console.log(state.CustomInputImageName);
        },

        removeCustomInputImageName(state, actions) {
            state.CustomInputImageName = {};
        },
        setUserInputImagesArray(state, actions) {
            state.UserInputImagesArray = actions.payload.UserInputImagesArray;
        },
        addUserInputImagesArray(state, actions) {
            state.UserInputImagesArray = state.UserInputImagesArray.push(actions.payload.ImageUri);
        }
    }
});


export const {
    resetEveryImageState,
    setUserImageUri,
    setUserId,
    removeUserId,
    setInputImageUri,
    removeInputImageUri,
    setInputImageResponse,
    removeInputImageResponse,
    setOutputImageUri,
    removeOutputImageUri,
    setCustomInputImageName,
    removeCustomInputImageName,
    setUserInputImagesArray,
    addUserInputImagesArray } = ImageUriSlice.actions;
export default ImageUriSlice.reducer;
