"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PendingStoreList from "./_pending/store-list";
import RejectedStoreList from "./_rejected/store-list";

export default function ApproveStore() {
  const [activeTab, setActiveTab] = useState<"pending" | "rejected">("pending");

  return (
    <div className="w-full">
      <h1 className="text-2xl text-slate-500">Stores</h1>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "pending" | "rejected")}
        className="mt-8"
      >
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <section>
            <PendingStoreList />
          </section>
        </TabsContent>

        <TabsContent value="rejected">
          <section>
            <RejectedStoreList />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
