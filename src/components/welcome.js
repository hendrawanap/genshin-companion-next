import Image from "next/image";

export default function Welcome(props) {
  return (
    <div className="pt-8 px-4 flex">
      <div className="font-poppins flex-1">
        <h1 className="text-4xl text-white text-opacity-90">Hello,</h1>
        <h1 className="text-5xl text-primary font-medium text-opacity-90 py-2 tracking-tight">
          {props.name}
        </h1>
      </div>
      <div className="w-2/5">
        <Image src="/assets/img/paimon_edited.png" width="100%" height="auto" layout="responsive" objectFit="contain" />
      </div>
    </div>
  );
}