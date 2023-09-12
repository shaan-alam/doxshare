import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const { data } = useSession();

  return (
    <aside className="flex h-screen w-[20%] flex-col p-6">
      <h1 className="text-2xl font-bold text-primary">Doxshare</h1>
      <div className="menu mt-12">
        <ul>
          <Link href="/app">
            <li className="rounded-md p-4 font-semibold text-primary hover:bg-primary-foreground">
              Documents
            </li>
          </Link>
          <Link href="/dox/new">
            <li className="rounded-md p-4 font-semibold text-primary hover:bg-primary-foreground">
              New Dox
            </li>
          </Link>
        </ul>
      </div>
      <div className="mt-auto w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex w-full items-center justify-between rounded-md bg-primary-foreground p-4">
              <div className="user flex items-center">
                <Avatar className="flex items-center justify-center">
                  <AvatarImage
                    src={data?.user.image as string}
                    className="h-8 w-8 rounded-full"
                  />
                </Avatar>
                <h1 className="ml-1 font-semibold text-primary">
                  {data?.user.name}
                </h1>
              </div>
              <ChevronUp size={20} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {data?.user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
