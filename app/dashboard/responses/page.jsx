"use client";
import { db } from "@/configs";
import { forms, userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, count } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItemResponse from "./_components/FormListItemResponse";

function Responses() {
  const { user } = useUser();
  const [formList, setFormList] = useState();

  useEffect(() => {
    user && getFormList();
  }, [user]);

  //   const getFormList = async () => {
  //     const result = await db
  //       .select()
  //       .from(forms)
  //       .where(eq(forms.createdBy, user?.primaryEmailAddress.emailAddress));
  //     setFormList(result);
  //   };

  const getFormList = async () => {
    const result = await db
      .select({
        form: forms,
        responseCount: count(userResponses.id),
      })
      .from(forms)
      .leftJoin(userResponses, eq(forms.id, userResponses.formRef))
      .where(eq(forms.createdBy, user?.primaryEmailAddress.emailAddress))
      .groupBy(forms.id);
    
    setFormList(result);
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary flex items-center justify-between">
        Responses
      </h2>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {formList?.map((formItem, index) => (
          <div key={index}>
            <FormListItemResponse
              formRecord={formItem.form}
              jsonForm={JSON.parse(formItem.form.jsonForm)}
              totalResponse={formItem.responseCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Responses;
