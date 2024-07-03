import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, LibraryBig, ListPlus, MessageSquare, Plus, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {useEffect} from "react";

function SideNav() {
    const path = usePathname();
    
    useEffect(() => {
      console.log(path);
    }, [path])
    
    const menuList = [
        {
            id:1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses'
        },
        {
            id:3,
            name: 'Analytics',
            icon: AreaChart,
            path: '/dashboard/analytics'
        },
        {
            id:4,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        }
    ]

  return (<div className="h-screen shadow-sm border">
    <div className="p-4">
        {menuList.map((menu, index) => (
            <Link href={menu.path} className={`flex items-center gap-3 p-5 hover:bg-primary hover:text-white rounded-lg mb-2 cursor-pointer ${path==menu.path && 'bg-primary text-white'}`} key={index}>
                <menu.icon/>
                {menu.name}
            </Link>
        ))}
    </div>
    <div className="fixed bottom-20 w-64 p-5">
        <Button className="w-full hover:bg-[rgba(0,26,73,0.34)] hover:text-primary"><ListPlus className="me-2"/> Create Form</Button>
        <div className="my-4">
            <Progress value={33}/>
            <h4 className="text-gray-700 mt-1 text-sm"><strong>2</strong>out of <strong>3</strong> file created.</h4>
            <h4 className="text-gray-700 mt-1 text-sm">upgrade your plan for unlimited AI forms.</h4>

        </div>
    </div>
  </div>);
}

export default SideNav;
