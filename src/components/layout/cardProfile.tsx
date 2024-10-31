import Image from "next/image";
import Logo from "@/components/logo";
import CardOld from "@/components/ui/cardOld";

interface CardProfileProps {
    position: string;
    image: string;
    name: string;
    period: string;
    address: string;
    phone: string;
}

const CardProfile = ({position, image, name, period, address, phone}: CardProfileProps) => {
    return (
        <CardOld title={position} classname="flex-col w-max rounded-xl">
            <div className="flex gap-4">
                <Image
                    src={image}
                    alt={position}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <P>Nama: {name}</P>
                        <P>Jabatan: {position}</P>
                        <P>Periode: {period}</P>
                        <P>Alamat: {address}</P>
                        <P>No. Telp: {phone}</P>
                    </div>

                    <div className="flex justify-end">
                        <Logo/>
                    </div>
                </div>
            </div>
        </CardOld>
    )
}

const P = ({children}: {children: React.ReactNode}) => {
    return <p className="text-lg">{children}</p>
}

export default CardProfile;