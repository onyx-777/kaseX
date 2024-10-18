"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit, Check, X } from "lucide-react"

type EditableFieldProps = {
  label: string
  value: string
  onUpdate: (value: string) => void
}

export function EditableField({ label, value, onUpdate }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [fieldValue, setFieldValue] = useState(value)

  const handleSave = () => {
    setIsEditing(false)
    if (fieldValue !== value) {
      onUpdate(fieldValue)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFieldValue(value)
  }

  return (
    <div className="space-y-2">
      <label htmlFor={label} className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <Input
              id={label}
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="flex-grow"
              autoFocus
            />
            <Button size="icon" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Input id={label} type="text" value={fieldValue} className="flex-grow" readOnly />
            <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}