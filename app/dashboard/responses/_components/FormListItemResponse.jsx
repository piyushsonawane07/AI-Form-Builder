import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { toast } from "sonner";

function FormListItemResponse({ formRecord, jsonForm, totalResponse }) {
  const [loading, setLoading] = useState(false);

  const ExportData = async () => {
    const jsonData = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      })
      setLoading(false);
    }
    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, jsonForm?.formTitle+'.xlsx');
    toast("File downloaded successfully ✅")
  }

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

        <Button
          size="sm"
          className="flex gap-2 hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"
          onClick={() => ExportData()}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
}

export default FormListItemResponse;
