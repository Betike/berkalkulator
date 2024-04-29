import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FamilyMemberTabs from '../FamilyMemberTabs/FamilyMemberTabs'
import usePeopleStore from '../store/peopleStore'
import { Minus, Trash2, Plus } from "lucide-react"
import { calculateNetSalary, validMarriageDate } from '@/lib/utils'

const SalaryCalculator = () => {

  const {people, changePersonName, changePersonSalary, changeNe, changePersonTax, removePerson} = usePeopleStore()
  return (
    <Tabs className="w-[80%] mx-auto mt-10">

      <FamilyMemberTabs people={people} />

      {people.map((e) => 
        <TabsContent key={e.id} value={e.id}>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
            <CardTitle className="font-bold text-transform: uppercase">{e.name} bérének kiszámítása</CardTitle>
            <Button className="w-[10%]" onClick={() => removePerson(e.id)}>
              <Trash2 />
            </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Családtag neve</Label>
              <Input id="name" value={e.name} onChange={(event) => changePersonName(event.target.value, e.id)}/>
              <CardDescription>
                Add meg a családtag nevét!
              </CardDescription>
            </div>
            <div className="space-y-1">
              <Label htmlFor="br-salary">Bruttó bér</Label>
              <Input id="br-salary" type="number" value={e.br_salary} onChange={(event) => changePersonSalary(event.target.value, e.id)} />
              <CardDescription>
                Add meg a bruttó béredet!
              </CardDescription>
            </div>
              <Slider min={1} max={2000000} value={[e.br_salary]} defaultValue={[e.br_salary]} step={1} onValueChange={(values) => changePersonSalary(values[0], e.id)} />
              <div className="w-[80%] mx-auto flex justify-evenly py-5">
                <Button variant="secondary" onClick={() => changePersonSalary(Math.round(e.br_salary * 0.99), e.id)}>-1%</Button>
                <Button variant="secondary" onClick={() => changePersonSalary(Math.round(e.br_salary * 0.95), e.id)}>-5%</Button>
                <Button variant="secondary" onClick={() => changePersonSalary(Math.round(e.br_salary * 1.01), e.id)}>+1%</Button>
                <Button variant="secondary" onClick={() => changePersonSalary(Math.round(e.br_salary * 1.05), e.id)}>+5%</Button>
              </div>
              <h2 className="text-transform: uppercase font-bold text-slate-800">Kedvezmények</h2>
              <div className="flex flex-col space-y-2 py-5">
                <div className="flex items-center space-x-2">
                  <Switch id="under25-td" checked={e.under25.checked} onCheckedChange={() => changePersonTax({...e.under25, checked:!e.under25.checked}, "under25", e.id)} />
                  <Label htmlFor="under25-td">25 év alattiak SZJA mentessége</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="married-td" checked={e.married.checked} onCheckedChange={() => changePersonTax({...e.married, checked:!e.married.checked}, "married", e.id)} />
                  <Label htmlFor="married-td">Friss házasok kedvezménye</Label>
                  {e.married.checked && (
                    <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-5 text-sm">Dátum hozzáadása</Button>
                    </DialogTrigger>
                    {/* A mentés gombra nem záródik be, a kis "x"-el kell bezárni, nem ellenőrzi, hogy helyes-e az input */}
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogDescription>
                          A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
                        </DialogDescription>
                        <DialogTitle>Add meg a házasságkötés dátumát:</DialogTitle>
                      </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Input
                            id="marriage-date"
                            placeholder="YYYY/MM/DD"
                            className="col-span-3"
                            value={e.married.date}
                            onChange={(evt) => changePersonTax({...e.married, date:evt.target.value}, "married", e.id)}
                          />
                        </div>
                        <DialogDescription>
                          Például: 2000/10/25
                        </DialogDescription>
                      <DialogFooter>
                        <Button type="submit" onClick={() => changePersonTax({...e.married, date:e.married.date}, "married", e.id)}>Mentés</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  )}
                  {validMarriageDate(e.married.date) && e.married.date !== "" && e.married.checked && (
                    <p className="bg-green-600 px-2 py-1 shadow rounded text-white text-center font-semibold">Jogosult</p>
                  )}
                  {e.married.date !== "" && !validMarriageDate(e.married.date) && e.married.checked && (
                    <p className="bg-red-600 px-2 py-1 shadow rounded text-white text-center font-semibold">Nem jogosult</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="personal-td" checked={e.personal.checked} onCheckedChange={() => changePersonTax({...e.personal, checked:!e.personal.checked}, "personal", e.id)} />
                  <Label htmlFor="personal-td">Személyi adókedvezmény</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="family-td" checked={e.hasFamily.checked} onCheckedChange={() => changePersonTax({...e.hasFamily, checked:!e.hasFamily.checked}, "hasFamily", e.id)} />
                  <Label htmlFor="family-td">Családi adókedvezmény</Label>
                </div>
                {e.hasFamily.checked && (
                  <div className="flex flex-row space-x-2">
                    <div>
                      <button onClick={() => {
                            if (0 < e.hasFamily.sustained) {
                              if (e.hasFamily.beneficiary === e.hasFamily.sustained) {
                                changePersonTax({...e.hasFamily, beneficiary: e.hasFamily.beneficiary - 1, sustained: e.hasFamily.sustained - 1}, "hasFamily", e.id)
                              } else {
                                changePersonTax({...e.hasFamily, sustained: e.hasFamily.sustained - 1}, "hasFamily", e.id);
                              }
                            }
                          }} variant="outline" className="rounded-lg border-2"> 
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-1">{e.hasFamily.sustained}</span>
                      <button onClick={() => {
                              changePersonTax({...e.hasFamily, sustained: e.hasFamily.sustained + 1}, "hasFamily", e.id);
                          }} variant="outline" className="rounded-lg border-2"> 
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-normal">Eltartott, ebből kedvezményezett: </div>
                    <div>
                      <button  onClick={() => {
                            if (0 < e.hasFamily.beneficiary) {
                              changePersonTax({...e.hasFamily, beneficiary: e.hasFamily.beneficiary - 1}, "hasFamily", e.id);
                            }
                          }} variant="outline" className="rounded-lg border-2"> 
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-1">{e.hasFamily.beneficiary}</span>
                      <button onClick={() => {
                            if (e.hasFamily.beneficiary < e.hasFamily.sustained && e.hasFamily.beneficiary < 3) {
                              changePersonTax({...e.hasFamily, beneficiary: e.hasFamily.beneficiary + 1}, "hasFamily", e.id);
                            }
                          }} variant="outline" className="rounded-lg border-2"> 
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col space-y-3">
            <h2 className="font-semibold text-2xl text-slate-800">Számított nettóbér:</h2>
            <Button onClick={() => changeNe(Math.round(calculateNetSalary(e)), e.id)}> {Math.round(calculateNetSalary(e))} Ft</Button>
            <CardDescription>
              A gombra rányomva elmentődik a számított nettó jövedelem.
            </CardDescription>
          </CardFooter>
        </Card>
      </TabsContent>
      )}
    </Tabs>
  )
}

export default SalaryCalculator
