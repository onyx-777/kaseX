"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserData } from "@/types/user"
import { EditableField } from "./editable-field"
import { updateUser } from "@/actions/user"
import { useToast } from "@/hooks/use-toast"

type Props = {
  userData: UserData
}

export default function Account({ userData }: Props) {
  const {toast} = useToast();
  if (!userData) return null

  const handleUpdate = async (field: "firstName" | "lastName", value: string) => {
    console.log({[field]: value})
    const result = await updateUser(userData.clerkId, { [field]: value })
    if (!result.success) {
      console.error("Failed to update user")
      // You might want to show an error message to the user here
      toast({
        title : 'Something went wrong!',
        description : 'Could not update your account details',
        variant : 'destructive'
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userData.firstName && (
            <EditableField
              label="First Name"
              value={userData.firstName}
              onUpdate={(value) => handleUpdate("firstName", value)}
            />
          )}
          {userData.lastName && (
            <EditableField
              label="Last Name"
              value={userData.lastName}
              onUpdate={(value) => handleUpdate("lastName", value)}
            />
          )}
        </div>
        <Separator />
        <InfoField label="Email" value={userData.email} />
        <Separator />
        <InfoField label="Joined" value={userData.createdAt.toDateString()} />
      </CardContent>
    </Card>
  )
}

type InfoFieldProps = {
  label: string
  value: string
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <p className="text-sm">{value}</p>
    </div>
  )
}