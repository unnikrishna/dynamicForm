import React from 'react'
import { Form, Row, Col, Button } from "react-bootstrap";

function SelectComponent({ field, index, value, handleFieldChange }) {
  return (
    <Form.Group controlId={field.id}>
      <Form.Label>{field.label}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => handleFieldChange(index, field.id, e.target.value)}
      >
        {Object.entries(field.options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default SelectComponent