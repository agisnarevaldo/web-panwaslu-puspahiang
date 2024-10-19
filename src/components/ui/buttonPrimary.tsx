import Link from "next/link";
import {Icon} from "@iconify/react/dist/iconify.js";

export default function Button({txt, href, classname}: { txt: string, href: string, classname?: string }) {
    return (
        <Link href={href}
              className={`${classname} bg-primary py-2 px-4 rounded-full flex items-center gap-2 text-white hover:bg-transparent border border-transparent hover:border-primary hover:text-primary`}>
            {txt}
            <Icon icon="mingcute:right-line"/>
        </Link>
    )
}