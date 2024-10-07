import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <Image src="/icon.png" alt="logo" width={60} height={60} />
      <div>
        <p className="text-[32px] leading-8 font-bold tracking-wider">
          BAWASLU
        </p>
        <p className="text-[9px]">PANITIA PENGAWAS PEMILIHAN UMUM</p>
        <p className="text-[12.5px] tracking-[0.5px] font-medium">
          KECAMATAN PUSPAHIANG
        </p>
      </div>
    </div>
  );
}
