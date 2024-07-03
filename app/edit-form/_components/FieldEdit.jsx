"use client";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function FieldEdit({ defaultValue, onUpdate, deleteField }) {
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
  const [label, setLabel] = useState(defaultValue?.label);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 mt-8 ms-2 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className="text-xs">Label Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.fieldLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs">Placeholder</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <div className="mt-2 text-center">
            <Button
              className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"
              size="sm"
              onClick={() =>
                onUpdate({
                  label: label,
                  placeholder: placeholder,
                })
              }
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Trash className="h-5 w-5 mt-8 text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"
              onClick={() => deleteField()}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
