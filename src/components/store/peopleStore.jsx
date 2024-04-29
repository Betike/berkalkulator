import { create } from 'zustand'

const usePeopleStore = create((set) => ({
    people: [
      {
        id: 0,
        name: "peter",
        br_salary: 537000,
        ne_salary: 0,
        under25: {
          checked: false
        },
        married: {
          date: "",
          checked: false
        },
        personal: {
          checked: false
        },
        hasFamily: {
          sustained: 0,
          beneficiary: 0,
          checked: false
        }
      }
    ],
    changePersonName: (name, id) => set((state) => ({
        people: state.people.map(person => {
          if (person.id === id) {
            return { ...person, name: name };
          }
          return person;
        })
      })),
    changePersonSalary: (br_salary, id) => set((state) => ({
        people: state.people.map(person => {
            if (person.id === id) {
                return { ...person, br_salary };
            }
            return person;
        })
    })),
    changeNe: (ne_salary, id) => set((state) => ({
      people: state.people.map(person => {
          if (person.id === id) {
              return { ...person, ne_salary };
          }
          return person;
        })
    })),
    changePersonTax: (newTax, taxName, id) => set((state) => ({
      people: state.people.map(person => {
        if (person.id === id) {
          return { ...person, [taxName] : newTax }
        }
        return person
      })
    })),
    addPerson: (id) => set((state) => ({people: [...state.people, {
      id: id,
      name: "New person",
      br_salary: 537000,
      ne_salary: 0,
      under25: {
        checked: false
      },
      married: {
        date: "",
        checked: false
      },
      personal: {
        checked: false
      },
      hasFamily: {
        sustained: 0,
        beneficiary: 0,
        checked: false
      }
    }]})),
    removePerson: (personId) => set((state) => ({people: state.people.filter(person => person.id !== personId)})) 
}))

export default usePeopleStore;
