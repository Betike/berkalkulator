import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import usePeopleStore from '../store/peopleStore'

const FamilyMemberTabs = () => {

  const {people, addPerson} = usePeopleStore((state) => ({
    people: state.people,
    addPerson: state.addPerson
  }))
  const l = people.length

  return (
      <TabsList className="space-x-2">
        {people.map((e,i) => <TabsTrigger value={e.id} key={i}>{e.name}</TabsTrigger>)}
        <Button variant="outline" onClick={() => addPerson(l)}> 
          <Plus className="h-4 w-4" />
        </Button>
      </TabsList>
  )
}

export default FamilyMemberTabs

