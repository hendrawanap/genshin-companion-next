import LandingLayout from "@/components/layouts/landing";
import Button from "@/components/material/button";
import Input from "@/components/material/input";
import Image from "next/image";
import Link from "next/link";
import { useReducer, useState, Fragment } from "react";
import { Listbox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button className="border border-white border-opacity-10 px-3 py-2 rounded-md text-left text-primary bg-primary bg-opacity-10 outline-none focus:outline-none">{selectedPerson.name}</Listbox.Button>
      <Listbox.Options className="border border-gray-600 rounded-md mt-2 divide-y divide-white divide-opacity-10 text-white text-opacity-60">
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {({ active, selected }) => (
              <li
                className={`px-3 py-2 ${
                  active ? 'bg-primary text-primary bg-opacity-10' : ''
                }`}
              >
                {person.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default function FirstSetup(props) {
  const INITIAL_FORM_STATES = {
    nickname: "",
    ar: 0,
    wl: 0,
    mainCharacter: "Aether",
    ascendLevel: 0,
    charLevel: 0
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "nickname":
        return { ...state, nickname: action.payload };
      case "ar":
        return { ...state, ar: action.payload };
      case "wl":
        return { ...state, wl: action.payload };
      case "mainCharacter":
        return { ...state, mainCharacter: action.payload };
      case "ascendLevel":
        return { ...state, ascendLevel: action.payload };
      case "charLevel":
        return { ...state, charLevel: action.payload };
    }
  };
  const [formStates, dispatch] = useReducer(formReducer, INITIAL_FORM_STATES);

  return (
    <LandingLayout>
      <h1 className="text-5xl text-primary font-medium">First Setup</h1>
      <h5 className="text-white text-opacity-60 mt-2">Setup your account for the first time, you can always edit later.</h5>
      <form className="mt-6 flex flex-col">
        <Input
          setValue={(payload) => dispatch({ type: "nickname", payload: payload })}
          type="text"
          isFull={true}
          placeholder="Nickname"
          icon={
            <span className="material-icons text-lg leading-none text-white text-opacity-30">
              badge
            </span>
          }
        />
        <div className="text-white text-opacity-60 mt-6 mb-3 text-sm">Account Progression</div>
        <div className="flex gap-x-3">
          <Input
            setValue={(payload) => dispatch({ type: "ar", payload: payload })}
            type="number"
            placeholder="Adventure Rank"
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                military_tech
              </span>
            }
          />
          <Input
            setValue={(payload) => dispatch({ type: "wl", payload: payload })}
            type="number"
            placeholder="World Level"
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                public
              </span>
            }
          />
        </div>
        <div className="text-white text-opacity-60 mt-6 mb-3 text-sm">Main Character Progression</div>
        <div className="flex gap-x-3 mb-3">
          <div className={`relative w-12 h-12 rounded-full border  overflow-hidden ${formStates.mainCharacter === "Aether" ? "border-primary bg-primary bg-opacity-10":"border-white border-opacity-10 bg-white bg-opacity-5"}`}
            onClick={() => dispatch({type: "mainCharacter", payload: "Aether"})}
          >
            <Image src="/assets/img/UI_AvatarIcon_Aether.png" alt="Aether" layout="fill" objectFit="contain"/>
          </div>
          <div className={`relative w-12 h-12 rounded-full border  overflow-hidden ${formStates.mainCharacter === "Lumine" ? "border-primary bg-primary bg-opacity-5":"border-white border-opacity-10 bg-white bg-opacity-5"}`}
            onClick={() => dispatch({type: "mainCharacter", payload: "Lumine"})}
          >
            <Image src="/assets/img/UI_AvatarIcon_Lumine.png" alt="Lumine" layout="fill" objectFit="contain"/>
          </div>
        </div>
        <div className="flex gap-x-3">
          {/* <Input
            setValue={(payload) => dispatch({ type: "ascendLevel", payload: payload })}
            type="number"
            placeholder="Ascend Lv."
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                military_tech
              </span>
            }
          /> */}
          <div className="text-white text-opacity-60 border border-white border-opacity-10 rounded-md whitespace-nowrap relative h-12 flex-1">
            <div className="absolute inset-0 text-2xs text-white text-opacity-30 px-3 pt-2">Ascend Lv.</div>
            <div className="absolute right-0 top-0 bottom-0 material-icons text-lg leading-none text-white text-opacity-30 flex items-center px-3">
              military_tech
            </div>
            <select className="absolute inset-0 px-3 bg-transparent w-full pt-3 appearance-none" name="levels">
              <option className="bg-navbar border-b border-white" value={0}>0</option>
              <option className="bg-navbar border-b border-white" value={1}>1</option>
              <option className="bg-navbar border-b border-white" value={2}>2</option>
              <option className="bg-navbar border-b border-white" value={3}>3</option>
              <option className="bg-navbar border-b border-white" value={4}>4</option>
              <option className="bg-navbar" value={5}>5</option>
            </select>
          </div>

          <div className="flex-1">
          <Input
            setValue={(payload) => dispatch({ type: "charLevel", payload: payload })}
            type="number"
            placeholder="Character Lv."
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                person
              </span>
            }
          />
          </div>
          

        </div>
          <MyListbox></MyListbox>
          
      </form>
      <div className="mt-6">
        <Button variant="primary" type="default" isFull={true} onClick={() => console.log(formStates)}>
          Continue
        </Button>
      </div>
    </LandingLayout>
  );
}
