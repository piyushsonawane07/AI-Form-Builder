import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";

function FormListItemResponse({formRecord, jsonForm, totalResponse}) {

  return (
    <div className="border shadow-sm rounded-lg p-5">
    <div className="flex justify-between cursor-pointer hover:text-red-500">
      <h2></h2>
    </div>
    <h2 className="text-black text-lg">{jsonForm?.formTitle}</h2>
    <h2 className="text-sm text-gray-700">{jsonForm?.formSubheading}</h2>
    <hr className="my-4" />
    <div className="flex justify-between">
      
        <Button variant="ghost" size="sm" className="flex gap-2">
           {totalResponse} Responses
        </Button>


      <Link href={"/edit-form/" + formRecord?.id}>
        <Button
          size="sm"
          className="flex gap-2 hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"
        >
         Download
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default FormListItemResponse