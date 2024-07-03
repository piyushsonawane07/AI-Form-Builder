"use client";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

function EditForm({ params }) {
  const router = useRouter();
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState({
    "color-scheme": "light",
    primary: "#1c2a3d",
    "primary-content": "#1c2a3d",
    secondary: "#ffffff",
    accent: "#1c2a3d",
    neutral: "#2e4057",
    "base-100": "#ffffff",
    info: "#1c2a3d",
    success: "##1c2a3d",
    warning: "#1c2a3d",
    error: "oklch(70.23% 0.24 34.12)",
    theme: "light",
  });
  const [selectedBackground, setSelectedBackground] = useState();

  useEffect(() => {
    user && getFormData();
  }, [user]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(
        and(
          eq(forms.id, params?.formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setRecord(result[0])
    setJsonForm(JSON.parse(result[0].jsonForm));
    setSelectedBackground(result[0].background);
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonDB();
    }
  }, [updateTrigger]);

  const updateJsonDB = async () => {
    const result = await db
      .update(forms)
      .set({ jsonForm: jsonForm })
      .where(
        and(
          eq(forms.id, params?.formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: forms.id });
    toast("Updated 👍");
  };

  const onFieldUpdate = (value, index) => {
    jsonForm.formFields[index].fieldLabel = value.label;
    jsonForm.formFields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const deleteField = (indexToRemove) => {
    const result = jsonForm.formFields.filter(
      (item, index) => index != indexToRemove
    );
    jsonForm.formFields = result;
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, column) => {
    const result = await db
      .update(forms)
      .set({ [column]: value })
      .where(
        and(
          eq(forms.id, params?.formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: forms.id });
    toast("Updated 👍");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex text-primary gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back("/dashboard")}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={'/aiform/'+record?.id} target="_blank">
            <Button className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary flex gap-2">
              {" "}
              <SquareArrowUpRight className="h-5 w-5" /> Live Preview
            </Button>
          </Link>

          <RWebShare
          data={{
            text: jsonForm?.formSubheading + "Build your form with FormifyAI",
            url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+record?.id,
            title: jsonForm?.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
         <Button className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary flex gap-2">
              <Share2 className="h-5 w-5" /> Share
            </Button>
        </RWebShare>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-sm">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
              setSelectedBackground(value);
            }}
          />
        </div>
        <div
          style={{ backgroundImage: selectedBackground }}
          className="md:col-span-2 border rounded-lg p-5  flex items-center justify-center"
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
