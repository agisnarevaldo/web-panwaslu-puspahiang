import Section from "@/components/layout/section";
import CardBerita from "@/components/ui/cardBerita";

export default function Page() {
  return (
    <main>
        <Section title="Berita" description="Berita terbaru seputar dunia teknologi">
            <div className="">
                <CardBerita
                    classname="flex-row w-full gap-4"
                    title={"Judul Berita"}
                    image={"/1.png"}
                    date={"2021-08-01"}
                    author={"Admin"}
                    href={"/berita/judul-berita"}
                    description={"Deskripsi panjang sekali tentang berita ini. Deskripsi panjang sekali tentang berita ini. Deskripsi panjang sekali tentang berita ini."}
                />
            </div>
        </Section>
    </main>
  );
}