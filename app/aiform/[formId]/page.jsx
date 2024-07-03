"use client";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function LiveAiForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState();

  useEffect(() => {
    params && getFormData();
  }, [params]);

  const getFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.id, Number(params?.formId)));

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonForm));
    console.log(result);
  };

  return (
    <div style={{backgroundImage: record?.background}} className="p-10 h-screen lg:h-screen flex items-center justify-center flex-col">
      { record && <FormUi
        jsonForm={jsonForm}
        onFieldUpdate={() => console.log}
        deleteField={() => console.log}
        selectedTheme={{
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
        }}
        editable={false}
        formId={record?.id}
      />}
      <Link href={'/'} className="m-5 flex flex-row">
        <strong className="text-sm mt-1">Build with</strong>
        <Image src={'/logo.svg'} width={150} height={150} alt="logo"/>
      </Link>
    </div>
  );
}

export default LiveAiForm;
