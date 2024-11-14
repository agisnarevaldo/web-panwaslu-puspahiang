import Image from "next/image";
import CardOld from "@/components/ui/cardOld";

interface CardProfileProps {
    position: string;
    image: string;
    name: string;
    period: string;
    address: string;
    phone: string;
    classname?: string;
}

const CardProfile = ({position, image, name, period, address, phone, classname}: CardProfileProps) => {
    return (
        <CardOld title={position} classname={`${classname} flex-col w-2/5 rounded-xl`}>
            <div className="flex gap-4">
                <div className="flex-initial">
                    <Image
                        src={image}
                        alt={position}
                        width={180}
                        height={180}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2 justify-between items-end">
                    <div className="max-w-[300px]">
                        <P>Nama: {name}</P>
                        <P>Jabatan: {position}</P>
                        <P>Periode: {period}</P>
                        <P>Alamat: {address}</P>
                        <P>No. Telp: {phone}</P>
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