import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    condition: {
      fields: [
        {
          label: "Type",
          id: "type",
          component: "Select",
          options: {
            zipcode: "Zip Code",
            state: "State",
            accountType: "Account Type",
          },
        },
        {
          label: "Operator",
          id: "operator",
          component: "Select",
          options: {
            NOT_EQUAL: "NOT EQUAL",
            EQUAL_TO: "EQUAL TO",
            CONTAINS: "CONTAINS",
          },
        },
        {
          label: "Value",
          id: "value",
          component: "Input",
        },
      ],
      conditionSeprator: {
        label: "Condition Seprator",
        id: "conditionSeprator",
        component: "Select",
        options: {
          OR: "OR",
          AND: "AND",
        },
      },
    },
    isGrouped: true,
    groupSeprator: {
      label: "Condition Seprator",
      id: "conditionSeprator",
      component: "Select",
      options: {
        OR: "OR",
        AND: "AND",
      },
    },
  },
  reqPayload:{}
};

export const dynamicFormSlice = createSlice({
  name: "dynamicForm",
  initialState,
  reducers: {
    submitForm:(state, action)=>{
        state.reqPayload= action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { submitForm } = dynamicFormSlice.actions;

export default dynamicFormSlice.reducer;
