export const conditionForm = {
  data: {
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
};

const output = {
  conditions: [
    {
      type: "zipcode",
      operator: "NOT_EQUAL",
      value: "89586",
      condition_seprator: "OR",
    },
    {
      type: "state",
      operator: "EQUAL_TO",
      value: "canvas",
      condition_seprator: "AND",
    },
    {
      type: "zipcode",
      operator: "EQUAL_TO",
      value: "85695",
    },
  ],
};
