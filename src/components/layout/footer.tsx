import Link from "next/link";
import {Icon} from "@iconify/react";

export default function Footer() {
    return (
        <footer className="flex px-12 w-full py-6 mt-12 bg-gray-100">
            <div className="w-1/2 flex flex-col gap-4 justify-start text-left">
                <h2>Tautan</h2>
                <div className="flex flex-col text-blue-700 text-sm">
                    <Link className="hover:underline w-max" href="https://indonesia.go.id">Republik Indonesia</Link>
                    <Link className="hover:underline w-max" href="https://dpr.go.id">Dewan Perwakilan Rakyat</Link>
                    <Link className="hover:underline w-max" href="https://kpu.go.id">Komisi Pemilihan Umum</Link>
                    <Link className="hover:underline w-max" href="https://dkpp.go.id">Dewan Kehormatan Penyelenggara
                        Pemilu</Link>
                    <Link className="hover:underline w-max" href="https://mahkamahkonstitusi.go.id">Mahkamah
                        Konstitusi</Link>
                    <Link className="hover:underline w-max" href="https://kemendagri.go.id">Kementrian Dalam
                        Negeri</Link>
                    <Link className="hover:underline w-max" href="https://polri.go.id">Kepolisian Republik
                        Indonesia</Link>
                    <Link className="hover:underline w-max" href="https://kejaksaan.go.id">Kejaksaan Agung</Link>
                </div>
                <h2>#AYOAWASIBERSAMA</h2>
            </div>
            <div className="w-1/2 text-right flex flex-col gap-4">
                <h2>Kontak Kami</h2>
                <div className="text-sm">
                    <p>Panitia Pengawas Pemilihan Umum Kecamatan Puspahiang</p>
                    <p>Jl Mandalasari Puspahiang, Kec. Puspahiang, Kabupaten Tasikmalaya, Jawa Barat</p>
                </div>
                <div>
                    <p>Email:</p>
                    <Link className="text-blue-700 hover:underline" href="mailto:panwascampuspahiang2022@gmail.com">
                        panwascampuspahiang2022@gmail.com
                    </Link>
                </div>
                <div className="flex justify-end text-2xl gap-2">
                    <Link
                        className="hover:text-blue-600"
                        href="https://www.facebook.com/people/Panwas-Kecamatan-Puspahiang/pfbid0axBxgZ48E95ZWcbFgdmGUDtMwE4RY6rdqGpCaCdU3msReR2jAVAQMgMnn7qi6cwdl/?ref=xav_ig_profile_web"
                    >
                        <Icon icon="uil:facebook"/>
                    </Link>
                    <Link
                        className="hover:text-blue-600"
                        href="https://www.instagram.com/panwaslu_puspahiang/"
                    >
                        <Icon icon="uil:instagram"/>
                    </Link>
                </div>
            </div>
        </footer>
    )
}