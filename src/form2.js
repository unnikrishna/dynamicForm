import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const InputForm = () => {
  const [conditions, setConditions] = useState([
    {
      type: "",
      operator: "",
      value: "",
      condition_seprator: "AND",
    },
  ]);

  const inputJson = {
    fields: [
      {
        label: "Type",
        id: "type",
        component: "Select",
        options: {
          "": "Select one",
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
          "": "Select one",
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
      {
        label: "Condition Separator",
        id: "condition_seprator",
        component: "Select",
        options: {
          OR: "OR",
          AND: "AND",
        },
      },
    ],
  };

  const handleFieldChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      { type: "", operator: "", value: "", condition_seprator: "AND" },
    ]);
  };

  const removeCondition = (index) => {
    if (conditions.length > 1) {
      const newConditions = conditions.filter((_, i) => i !== index);
      setConditions(newConditions);
    }
  };

  const generateOutputJson = () => {
    const outputJson = {
      conditions: conditions.map((condition) => ({
        type: condition.type,
        operator: condition.operator,
        value: condition.value,
        condition_seprator: condition.condition_seprator,
      })),
    };
    console.log(outputJson);
  };

  return (
    <Form>
      {conditions.map((condition, index) => (
        <div key={index}>
          <Row>
            {inputJson.fields.map((field) => (
              <Col key={field.id}>
                {field.component === "Select" ? (
                  <Form.Group controlId={field.id}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      as="select"
                      value={condition[field.id]}
                      onChange={(e) =>
                        handleFieldChange(index, field.id, e.target.value)
                      }
                    >
                      {Object.entries(field.options).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                ) : (
                  <Form.Group controlId={field.id}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type="text"
                      value={condition[field.id]}
                      onChange={(e) =>
                        handleFieldChange(index, field.id, e.target.value)
                      }
                    />
                  </Form.Group>
                )}
              </Col>
            ))}
            {index < conditions.length - 1 && (
              <Col>
                <Form.Group controlId="removeCondition">
                  <Form.Label>Remove Condition</Form.Label>
                  <Button
                    variant="danger"
                    onClick={() => removeCondition(index)}
                  >
                    Remove
                  </Button>
                </Form.Group>
              </Col>
            )}
          </Row>
        </div>
      ))}
      <Button variant="success" onClick={addCondition}>
        Add Condition
      </Button>
      <Button variant="primary" onClick={generateOutputJson}>
        Generate Output JSON
      </Button>
    </Form>
  );
};

export default InputForm;
