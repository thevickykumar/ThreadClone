import React from "react";
import UserListCard from "../common/UserListCard";
import { getUsers } from "@/lib/serverMethods";

export default async function RightSidebar() {
  const users: Array<UserType> | [] = await getUsers();

  return (
    <div className="h-screen border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block">
      <h1 className="text-2xl font-bold mb-5">Suggestion for you</h1>
      {users &&
        users.length > 0 &&
        users.map((item) => <UserListCard user={item} key={item.id} />)}

        {users && users.length<1 && 
        <h1 className="text-xl text-center">
          No Suggestion found</h1>}
    </div>
  );
}
