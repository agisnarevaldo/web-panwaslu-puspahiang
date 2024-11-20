import Image from "next/image";
import CardOld from "@/components/ui/cardOld";

interface CardProfileProps {
    nama: string;
    jabatan: string;
    periode: string;
    alamat: string;
    email: string;
    photo: string;
    classname?: string;
}

const CardProfile = ({nama, photo, jabatan, periode, alamat, email, classname}: CardProfileProps) => {
    return (
        <CardOld title={nama} classname={`${classname} flex-col rounded-xl`}>
            <div className="flex gap-4">
                <div className="flex-initial">
                    <img
                        src={photo}
                        alt={nama}
                        className="rounded-lg w-24"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2 justify-between items-end">
                    <div className="max-w-[300px]">
                        <P>{nama}</P>
                        <P>{jabatan}</P>
                        <P>{periode}</P>
                        <P>{alamat}</P>
                        <P>{email}</P>
                    </div>
                    <div className={`flex gap-2 items-center`}>
                        <Image src="/icon.png" alt="logo" width={50} height={50}/>
                        <div>
                            <p className="text-[28px] leading-8 font-bold tracking-wider">
                                BAWASLU
                            </p>
                            <p className="text-[8px]">PANITIA PENGAWAS PEMILIHAN UMUM</p>
                            <p className="text-[11px] tracking-[0.5px] font-medium">
                                KECAMATAN PUSPAHIANG
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CardOld>
    )
}

const P = ({children}: { children: React.ReactNode }) => {
    return <p className="">{children}</p>
}

export default CardProfile;