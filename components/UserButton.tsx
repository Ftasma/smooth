import React from 'react'
import userImage from "../public/Frame 425.png";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { ModeToggle } from './DarkMode';
const UserButton = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
const router = useRouter()
const handleLogout = () => {
  removeCookie("token");
  router.push("/sign-in"); // Redirect to the login page 
};
  return (<div className=' bg-white'>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost"><Image src={userImage} height={30} width={60} alt='user image'/></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[10rem] mr-3 bg-white">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span><ModeToggle/></span>
        </DropdownMenuItem> */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span onClick={handleLogout}>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
  )
}

export default UserButton