"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";
import { aiChatSession } from "@/configs/AiModel";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { forms } from "@/configs/schema";
import { db } from "@/configs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";



function CreateForm() {

    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState()
    const PROMPT = ", format with form title, form subheading with form having Form field, form name, placeholder , and field label, fieldType, field required in JSON format."
    const {user} = useUser();
    const router = useRouter();
    
    const onCreateForm = async () => {
      setLoading(true);
      const result = await aiChatSession.sendMessage("Description: "+userInput+PROMPT);
      if(result.response.text()){
        const resp = await db.insert(forms).values({jsonForm: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD/MM/yyyy')
        }).returning({id: forms.id});
        console.log("Form Id: ",resp);
        if(resp[0].id){
          router.push('/edit-form/'+resp[0].id)
        }
        setLoading(false);
      }
      setLoading(false)
    }

  return (
    <div>
    <Button className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary" onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
                <Textarea onChange={(e) => setUserInput(e.target.value)} className="my-2" placeholder="write description of your form"/>
                <div className="flex gap-2 my-3 justify-end">
                    <Button onClick={() => setOpenDialog(false)} variant="destructive">Cancel</Button>
                    <Button disabled={loading} onClick={()=>onCreateForm()} className="hover:bg-[rgba(0,26,73,0.34)] hover:text-primary" >{loading?<LoaderCircle className="animate-spin"/>:'Create'}</Button>
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
