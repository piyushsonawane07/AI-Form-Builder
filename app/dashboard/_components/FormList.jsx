"use client";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import FormItem from "./FormItem";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && getFormsList();
  }, [user]);

  const getFormsList = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(forms.id));

    console.log(result);
    setFormList(result);
  };

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList && formList?.map((form, index) => (
        <div key={index}>
          <FormItem jsonForm={JSON.parse(form.jsonForm)} formRecord={form} refreshData={getFormsList}/>
        </div>
      ))}
    </div>
  );
}

export default FormList;
