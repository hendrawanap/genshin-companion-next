import LandingLayout from "@/components/layouts/landing";
import Button from "@/components/material/button";
import Input from "@/components/material/input";
import Image from "next/image";
import Link from "next/link";
import { useReducer } from "react";

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
            type="text"
            placeholder="Adventure Rank"
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                military_tech
              </span>
            }
          />
          <Input
            setValue={(payload) => dispatch({ type: "wl", payload: payload })}
            type="text"
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
          <Input
            setValue={(payload) => dispatch({ type: "ascendLevel", payload: payload })}
            type="text"
            placeholder="Ascend Lv."
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                military_tech
              </span>
            }
          />
          <Input
            setValue={(payload) => dispatch({ type: "charLevel", payload: payload })}
            type="text"
            placeholder="Character Lv."
            icon={
              <span className="material-icons text-lg leading-none text-white text-opacity-30">
                person
              </span>
            }
          />
        </div>
      </form>
      <div className="mt-6">
        <Button variant="primary" type="default" isFull={true} onClick={() => console.log(formStates)}>
          Continue
        </Button>
      </div>
    </LandingLayout>
  );
}
