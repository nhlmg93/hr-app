import { Search, Plus } from "lucide-react";

import { Label } from "./ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Form } from "react-router";

type ContactsSidebarProps = {
  children: React.ReactNode;
};
export default function ContactsSidebar({ children }: ContactsSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <h1 className="text-xl font-bold">React Router Contacts</h1>
          </div>
          <Form role="search" className="px-2 pb-2">
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <Label htmlFor="search" className="sr-only">
                  Search contacts
                </Label>
                <SidebarInput
                  id="search"
                  name="q"
                  placeholder="Search"
                  type="search"
                  aria-label="Search contacts"
                  className="pl-8"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                <div id="search-spinner" aria-hidden hidden={true} />
              </SidebarGroupContent>
            </SidebarGroup>
          </Form>
          <Form
            action="/contacts"
            method="POST"
            className="px-2 pb-2"
          >
            <Button variant={"secondary"} type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New
            </Button>
          </Form>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Contacts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/contacts/1">Your Name</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/contacts/2">Your Friend</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}
