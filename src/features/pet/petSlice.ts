import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Pet } from '../../api/api';

/** Store in this Slice. */
interface PetsState {
  /** Pet List. */
  value: Pet[];
  /** Error message of REST call. */
  errorMessage?: string;
  /** Error code of REST call. */
  errorCode?: number;
}

/** initial state of store. */
const initialState: PetsState = {
  value: [],
};

/** Reject type of Async Thunk. */
interface PetsError {
  /** Error message of REST call. */
  errorMessage?: string;
  /** Error code of REST call. */
  errorCode?: number;
}

/** Action of async thunk. */
const ACTION_PETS_FETCH = 'pets/fetch';

/** Resource path of REST server. */
const RESOURCE_PATH = '/pet';

/** Async Thunk which get Pet data from Rest server using Axios. */
export const getPets = createAsyncThunk<
  /** Fullfilled data type. */
  Pet[],
  /** Parameter data type. */
  string,
  /** Reject data type. */
  {
    rejectValue: PetsError;
  }
>(ACTION_PETS_FETCH, async (statusCondition, thunkApi) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_REST_BASE,
    params: { status: statusCondition },
  });
  const result = await instance
    .get(RESOURCE_PATH)
    .then(function (response) {
      console.log('api success status: ' + response.status);
      return response.data;
    })
    .catch(function (error: AxiosError) {
      if (error.response) {
        console.log('api error status: ' + error.response.status);
      } else if (error.request) {
        console.log('api error request:' + error.request);
      } else {
        console.log('api error message: ', error.message);
      }
      return thunkApi.rejectWithValue({
        errorMessage: 'api call failed.',
      });
    });
  return result;
});

/** Slice for Pet operation. */
const petSlice = createSlice({
  /** Slice name. */
  name: 'pet',
  /** Initial state of this slice store. */
  initialState,
  /** Basic reducers of this slice. */
  reducers: {
    /** Reducer which adds a pet record in This slice store. */
    addPet: (state, action: PayloadAction<Pet>) => {
      console.log('addPet reducer of pet slice. id: ' + action.payload.id);
      state.value = state.value.concat(action.payload);
    },
  },
  /** Extra Reducers of this slice. */
  extraReducers: (builder) => {
    /** For the case of the getPets async thunk success, update the store with returned value.  */
    builder.addCase(getPets.fulfilled, (state, action) => {
      console.log(
        'fulfilled extrareducer of getPets. data size: ' + action.payload.length
      );
      state.value = action.payload;
    });
    /** For the case of the getPets rejection, return error message or error code.  */
    builder.addCase(getPets.rejected, (state, action) => {
      if (action.payload) {
        console.log(
          'rejected extrareducer of getPets. error message: ' +
            action.error.message
        );
      } else {
        console.log(
          'rejected extrareducer of getPets. error code: ' + action.error.code
        );
      }
    });
  },
});

export const { addPet } = petSlice.actions;
export default petSlice.reducer;
