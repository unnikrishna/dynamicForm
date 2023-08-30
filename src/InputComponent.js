import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function InputComponent({ field, index, value, handleFieldChange }) {
  return (
    <Form.Group controlId={field.id}>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(e) => handleFieldChange(index, field.id, e.target.value)}
      />
    </Form.Group>
  );
}

export default InputComponent;
