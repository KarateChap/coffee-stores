import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import Image from "next/image";
import Link from "next/link";
const Card = ({ name, imgUrl, href }) => {
  return (
    <div className="glass p-3 hover:bg-white/40 flex justify-center">
      <Link href={href} className="justify-center flex items-center">
        <a className="flex gap-2 flex-col">
          <h1 className="text-2xl font-bold font-[IBMPlexSans] text-center">{name}</h1>
          <div className="w-full justify-center flex">
            <Image src={imgUrl} width={260} height={160} alt="/" className="rounded-xl"/>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
