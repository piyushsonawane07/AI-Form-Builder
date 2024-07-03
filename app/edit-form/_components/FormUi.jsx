"use client"
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";
import { Button } from "@/components/ui/button";
import { userResponses } from "@/configs/schema";
import { db } from "@/configs";
import moment from "moment";
import { toast } from "sonner";

function FormUi({ jsonForm, selectedTheme, onFieldUpdate, deleteField, editable=true, formId=0 }) {

  const [formData, setFormData] = useState();
  const formRef = useRef(null);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format('DD/MM/yyy'),
      formRef: formId
    });

    if(result) {
      formRef.current.reset();
      toast('Response Submitted Successfully 👍')
    }else{
      toast('Error submitting response ❌')
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName]?formData?.[fieldName]:[];
    if(value) {
      list.push({
        label: itemName,
        value: value
      })

      setFormData({
        ...formData,
        [fieldName]: list
      })
    }else {
      const result = list.filter((item) => item.label==itemName);
      setFormData({
        ...formData,
        [fieldName]: result
      })
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="border rounded-md p-5 md:w-[600px]"
      style={{
        backgroundColor: selectedTheme["base-100"],
        color: selectedTheme["primary-content"]
      }}
    >
      <h2
        className="font-bold text-center text-xl"
        style={{ color: selectedTheme.primary }}
      >
        {jsonForm?.formTitle}
      </h2>
      <h2
        className="text-md text-center"
        style={{ color: selectedTheme["primary-content"] }}
      >
        {jsonForm?.formSubheading}
      </h2>
      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className="flex my-3 w-full">
          {field.fieldType === "select" ? (
            <div className="w-full">
              <label className="text-sm" style={{ color: selectedTheme.primary }}>
                {field.fieldLabel}
              </label>
              <Select required={field?.fieldRequired} onValueChange={(v) => handleSelectChange(field?.fieldName,v)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, idx) => (
                    <SelectItem key={idx} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div className="w-full">
              <RadioGroup defaultValue={field.options[0].label} required={field?.fieldRequired}>
                {field.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.label} id={option.label} onClick={() => handleInputChange(field.fieldName, option.label)} />
                    <Label htmlFor={option.label} style={{ color: selectedTheme["primary-content"] }}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className="w-full">
              <Label style={{ color: selectedTheme["primary-content"] }}>{field.fieldLabel}</Label>
              {field.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Checkbox id={option.label} onCheckedChange={(v)=>handleCheckboxChange(field.fieldLabel, option.label ,v)} />
                  <Label htmlFor={option.label} style={{ color: selectedTheme["primary-content"] }}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full">
              <label className="text-sm" style={{ color: selectedTheme.primary }}>
                {field.fieldLabel}
              </label>
              <Input
                className="bg-transparent"
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                required={field?.fieldRequired}
                style={{
                  color: selectedTheme["primary-content"],
                  borderColor: selectedTheme.primary
                }}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          )}
          {editable && <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>}
          
        </div>
      ))}
      <div className="text-center">
        <Button type="submit" style={{
          backgroundColor: selectedTheme.primary,
          color: selectedTheme["secondary"]
        }}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default FormUi;
