import React from "react";
import { UserManagement } from "./user-management";

export default function UserAccounts () {
    return (
        <div className="container mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1F2937]">
            Accounts
          </h1>
        </div>
      </div>
        <UserManagement />
      </div>
    )
}