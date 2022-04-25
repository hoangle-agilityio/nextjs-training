import Link from "next/link";
import { memo } from "react";

interface ButtonProps {
  buttonName: string;
  type: string;
  href?: string;
  onClick?: () => void;
}

function Button({ buttonName, type, href, onClick }: ButtonProps): JSX.Element {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {href ? (
        <Link href={href}>
          {buttonName}
        </Link>
      ) :
        buttonName
      }
    </button>
  );
}

export default memo(Button);
