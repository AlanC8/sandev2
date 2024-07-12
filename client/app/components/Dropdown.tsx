import React, { useEffect, useState } from "react";
import {
  Cloud,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { UserService } from "../services/UserServices";
import Link from "next/link";

export function Dropdown(logged) {
  const [username, setUsername] = useState("");
  const checkUserData = async () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const response = await UserService.getUser();
      setUsername(response.data.username);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      checkUserData();
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#254D32] font-bold">
          {logged ? (
            username
          ) : (
            <Link href={"/login"}>
              Get Started
            </Link>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("access");
            location.reload()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
