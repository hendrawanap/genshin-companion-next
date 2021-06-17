import Image from "next/image";

export default function Header(props) {
  return (
    <header className="flex items-center fixed z-30 top-0 left-0 right-0 h-14 justify-center">
      <div className="relative" style={{ height: "36px", width: "120px" }}>
        <Image
          src="/assets/img/Logo.png"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
    </header>
  );
}
