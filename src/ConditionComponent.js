import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import SelectComponent from "./SelectComponent";
import InputComponent from "./InputComponent";
import { useSelector } from "react-redux";


const InputForm = ({ conditions, onConditionsChange }) => {
  const form = useSelector((state) => state.dynamicForm.form);
  const inputJson = { fields: form.condition.fields };
  const conditionSep = form.condition.conditionSeprator;
  
  const handleFieldChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    onConditionsChange(newConditions);
  };

  const addCondition = () => {
    onConditionsChange([
      ...conditions,
      { type: "", operator: "", value: "", condition_seprator: "" },
    ]);
  };

  const removeCondition = (index) => {
    if (conditions.length > 1) {
      const newConditions = conditions.filter((_, i) => i !== index);
      onConditionsChange(newConditions);
    }
  };

  return (
    <Form>
      {conditions.map((condition, index) => (
        <div className="condition" key={index}>
          <Row className="conditionRow">
            {inputJson.fields.map((field) => (
              <Col key={field.id}>
                {field.component === "Select" ? (
                  <SelectComponent
                    field={field}
                    index={index}
                    value={condition[field.id]}
                    handleFieldChange={handleFieldChange}
                  />
                ) : (
                 <InputComponent 
                    field={field}
                    index={index}
                    value={condition[field.id]}
                    handleFieldChange={handleFieldChange}
                  />
                  
                )}
              </Col>
            ))}
            {index < conditions.length - 1 && (
              <>
                <SelectComponent
                  field={conditionSep}
                  index={index}
                  value={conditions[index]["condition_seprator"] || ""}
                  handleFieldChange={handleFieldChange}
                />
                {/* <Form.Group controlId={conditionSep.id}>
                  <Form.Label>{conditionSep.label}</Form.Label>
                  <Form.Control
                    as="select"
                    value={conditions[index]["condition_seprator"] || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "condition_seprator",
                        e.target.value
                      )
                    }
                  >
                    {Object.entries(conditionSep.options).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group> */}
                <Form.Group controlId="removeCondition">
                  <Form.Label>Remove Condition</Form.Label>
                  <Button
                    variant="danger"
                    onClick={() => removeCondition(index)}
                  >
                    Remove
                  </Button>
                </Form.Group>
              </>
            )}
          </Row>
        </div>
      ))}
      <Button variant="success" onClick={addCondition}>
        Add Condition
      </Button>
    </Form>
  );
};

export default InputForm;
