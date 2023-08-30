import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import InputForm from "./ConditionComponent";
import SelectComponent from "./SelectComponent";
// import "./styles.css"; // Import the CSS file
import { useSelector } from "react-redux";

const GroupedConditions = () => {
  const form = useSelector((state) => state.dynamicForm.form);
  const groupSeprator = form.groupSeprator;

  const [groups, setGroups] = useState([
    {
      conditions: [
        {
          type: "",
          operator: "",
          value: "",
          condition_seprator: "",
        },
      ],
      group_seprator: "",
    },
  ]);

  // const groupSeprator = {
  //   label: "Group Separator",
  //   id: "group_seprator",
  //   component: "Select",
  //   options: {
  //     "":'Select one',
  //     OR: "OR",
  //     AND: "AND",
  //   },
  // };

  const handleConditionsChange = (groupIndex, newConditions) => {
    const newGroups = [...groups];
    newGroups[groupIndex].conditions = newConditions;
    setGroups(newGroups);
  };
  const handleGroupeSep = (groupIndex,id,  value) => {
    const newGroups = [...groups];
    newGroups[groupIndex].group_seprator = value;
    setGroups(newGroups);
  };

  const addGroup = () => {
    console.log([
      ...groups,
      {
        conditions: [
          { type: "", operator: "", value: "", condition_seprator: "" },
        ],
        group_seprator: "",
      },
    ]);
    setGroups([
      ...groups,
      {
        conditions: [
          { type: "", operator: "", value: "", condition_seprator: "" },
        ],
        group_seprator: "",
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
    console.log(groups);
    const outputJson = {
      groups: groups.map((group) => ({
        conditions: group.conditions.map((condition) => ({
          type: condition.type,
          operator: condition.operator,
          value: condition.value,
          condition_seprator: condition.condition_seprator,
        })),
        group_seprator: group.group_seprator,
      })),
    };
    console.log(outputJson);
  };

  return (
    <div>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="group">
          <InputForm
            conditions={group.conditions}
            onConditionsChange={(newConditions) =>
              handleConditionsChange(groupIndex, newConditions)
            }
          />
          {groupIndex >= 0 && groupIndex !== groups.length - 1 && (
            <SelectComponent
              field={groupSeprator}
              index={groupIndex}
              value={group.group_seprator || ""}
              handleFieldChange={handleGroupeSep}
            />
            // <Form.Group controlId={groupSeprator.id}>
            //   <Form.Label>{groupSeprator.label}</Form.Label>
            //   <Form.Control
            //     as="select"
            //     value={group.group_seprator || ""}
            //     onChange={(e) => handleGroupeSep(groupIndex, e.target.value)}
            //   >
            //     {Object.entries(groupSeprator.options).map(([key, value]) => (
            //       <option key={key} value={key}>
            //         {value}
            //       </option>
            //     ))}
            //   </Form.Control>
            // </Form.Group>
          )}
          {groupIndex > 0 && (
            <>
              <Button variant="danger" onClick={() => removeGroup(groupIndex)}>
                Remove Group
              </Button>
            </>
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
