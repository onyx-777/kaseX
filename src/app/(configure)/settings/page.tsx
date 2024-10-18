import { getUserDetails } from "@/actions/user";
import Account from "@/components/settings/account/account";
import Orders from "@/components/settings/orders";
import Shipping from "@/components/settings/shipping";
import Theme from "@/components/settings/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
// import Billing from "./billing"
// import Orders from "./orders"
// import AppTheme from "./theme"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
};

export default async function SettingsPage() {
  const userData = await getUserDetails();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto md:p-10 pb-16 max-w-[70rem]">
      <Tabs defaultValue="account" className="space-y-10">
        <TabsList className="grid w-full grid-cols-4 ">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-10">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Account</h2>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
          </div>
          <Account userData={userData} />
        </TabsContent>
        <TabsContent value="shipping" className="space-y-4">
          <Shipping />
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <Orders />
        </TabsContent>
        <TabsContent value="theme" className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Theme</h2>
          <Theme />
        </TabsContent>
      </Tabs>
    </div>
  );
}
