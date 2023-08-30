import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const GroupedConditions = () => {
  const [groups, setGroups] = useState([
    {
      conditions: [
        {
          type: "",
          operator: "",
          value: "",
        },
      ],
      group_seprator: "AND",
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
    ],
    groupSeprator: {
      label: "Group Seprator",
      id: "group_seprator",
      component: "Select",
      options: {
        OR: "OR",
        AND: "AND",
      },
    },
  };

  const handleFieldChange = (groupIndex, conditionIndex, field, value) => {
    const newGroups = [...groups];
    newGroups[groupIndex].conditions[conditionIndex][field] = value;
    setGroups(newGroups);
  };

  const addCondition = (groupIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].conditions.push({
      type: "",
      operator: "",
      value: "",
    });
    setGroups(newGroups);
  };

  const removeCondition = (groupIndex, conditionIndex) => {
    if (groups[groupIndex].conditions.length > 1) {
      const newGroups = [...groups];
      newGroups[groupIndex].conditions.splice(conditionIndex, 1);
      setGroups(newGroups);
    }
  };

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        conditions: [{ type: "", operator: "", value: "" }],
        group_seprator: "AND",
      },
    ]);
  };

  const removeGroup = (groupIndex) => {
    if (groups.length > 1) {
      const newGroups = groups.filter((_, i) => i !== groupIndex);
      setGroups(newGroups);
    }
  };

  const generateOutputJson = () => {
    const outputJson = {
      groups: groups.map((group) => ({
        conditions: group.conditions.map((condition) => ({
          type: condition.type,
          operator: condition.operator,
          value: condition.value,
        })),
        group_seprator: group.group_seprator,
      })),
    };
    console.log(outputJson);
  };

  return (
    <div>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <Form.Group controlId="groupSeparator">
            <Form.Label>Group Separator</Form.Label>
            <Form.Control
              as="select"
              value={group.group_seprator}
              onChange={(e) => {
                const newGroups = [...groups];
                newGroups[groupIndex].group_seprator = e.target.value;
                setGroups(newGroups);
              }}
            >
              {Object.entries(inputJson.groupSeprator.options).map(
                ([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>
          {group.conditions.map((condition, conditionIndex) => (
            <Row key={conditionIndex}>
              {inputJson.fields.map((field) => (
                <Col key={field.id}>
                  {field.component === "Select" ? (
                    <Form.Group controlId={field.id}>
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        as="select"
                        value={condition[field.id]}
                        onChange={(e) =>
                          handleFieldChange(
                            groupIndex,
                            conditionIndex,
                            field.id,
                            e.target.value
                          )
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
                          handleFieldChange(
                            groupIndex,
                            conditionIndex,
                            field.id,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  )}
                </Col>
              ))}
              {group.conditions.length > 1 && (
                <Col>
                  <Form.Group controlId="removeCondition">
                    <Form.Label>Remove Condition</Form.Label>
                    <Button
                      variant="danger"
                      onClick={() =>
                        removeCondition(groupIndex, conditionIndex)
                      }
                    >
                      Remove
                    </Button>
                  </Form.Group>
                </Col>
              )}
            </Row>
          ))}
          <Button variant="success" onClick={() => addCondition(groupIndex)}>
            Add Condition
          </Button>
          {groupIndex > 0 && (
            <Button variant="danger" onClick={() => removeGroup(groupIndex)}>
              Remove Group
            </Button>
          )}
        </div>
      ))}
      <Button variant="success" onClick={addGroup}>
        Add Group
      </Button>
      <Button variant="primary" onClick={generateOutputJson}>
        Generate Output JSON
      </Button>
    </div>
  );
};

export default GroupedConditions;
