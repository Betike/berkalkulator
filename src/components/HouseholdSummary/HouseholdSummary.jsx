import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import usePeopleStore from '../store/peopleStore';
import { calculateNetSalary, sumNetSalaries } from '@/lib/utils';


const HouseholdSummary = () => {
  
  const {people} = usePeopleStore((state) => ({
    people: state.people,
  }))

  
  return (
      <div className="text-center w-[80%] mx-auto">
        <h1 className="pt-40 pb-10 text-3xl font-bold">Háztartás összesített jövedelme</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-bold text-slate-800">Családtag</TableHead>
              <TableHead className="text-left font-bold text-slate-800">Nettó bér</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.map( (e) => (
              <TableRow key={e.name}>
                <TableCell className="text-left font-semibold">{e.name}</TableCell>
                <TableCell className="text-left">{e.ne_salary} Ft</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="text-left font-bold">Összesen:</TableCell>
              <TableCell className="text-left font-medium">{sumNetSalaries(people)} Ft</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  )
}

export default HouseholdSummary

