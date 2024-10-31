import Section from "@/components/layout/section";
import CardOld from "@/components/ui/cardOld";
import Header from "@/components/layout/header";
import Image from "next/image";
import CardProfile from "@/components/layout/cardProfile";

export default function Page() {
  return (
    <main className="">
      <Section title="Profil" description="Profil Panwaslu Kecamatan Puspahiang" classname="py-0">
          <div className="flex flex-col pt-8 gap-8">
              <CardOld title="Visi" classname="flex-col">
                    <p>
                        Terwujudnya panwaslu kecamatan puspahiang sebagai pengawas atau pengawal demokrasi terpercaya dalam pemilu atau pemilihan yang demokratis, bermartabat, dan berkualitas
                    </p>
              </CardOld>
              <CardOld title="Misi" classname="flex-col">
                  <ol className="list-decimal">
                      <li>Membangun Aparatur dan kelembagaan pengawas pemilu yang kuat, mandiri dan solid;</li>
                      <li>Mengembangkan pola dan metode pengawasan yang efektif dan efisien;</li>
                      <li>Memperkuat sistem kontrol nasional dalam satu manajemen pengawasan terstruktur, sistematis, dan integratif berbasis teknoligi;</li>
                      <li>Meningkatkan keterlibatan masyarakat dan peserta pemilu, serta meningkatkan sinergi kelembagaan dalam pengawasan pemilu partisipatif;</li>
                      <li>Meningkatkan kepercayaan publik atas kualitas kinerja pengawasan berupa pencegahan dan penindakan, serta penyelesaian sengketa secara cepat, akurat dan transparan;</li>
                      <li>Membangun bawaslu sebagai pusat pembelajaran pengawasan pemilu baik bagi pihak dari dalam negeri maupun pihak dari luar negeri</li>
                  </ol>
              </CardOld>
          </div>

          <div className="flex flex-col my-8 gap-8">
              <Header
                  title={"Struktur Organisasi"}
                  description={"Struktur Organisasi Panwaslu Kecamatan Puspahiang"}
                  classname="mt-8"
              />
              <Image
                  src="/STRUKTUR.png"
                  alt="Struktur Organisasi Panwaslu Kecamatan Puspahiang"
                  width={800}
                  height={800}
                  className="mx-auto"
              />
          </div>

          <div className="flex flex-wrap gap-4">
              <CardProfile
                  position={"Ketua"}
                  image={"/person.png"}
                  name={"Agus Tarwana"}
                  period={"2020-2025"}
                  address={"Jl. Raya Puspahiang No. 123"}
                  phone={"081234567890"}
              />

              <CardProfile
                  position={"Ketua"}
                  image={"/p2.jpeg"}
                  name={"Agus Tarwana"}
                  period={"2020-2025"}
                  address={"Jl. Raya Puspahiang No. 123"}
                  phone={"081234567890"}
              />

              <CardProfile
                  position={"Ketua"}
                  image={"/person.png"}
                  name={"Agus Tarwana"}
                  period={"2020-2025"}
                  address={"Jl. Raya Puspahiang No. 123"}
                  phone={"081234567890"}
              />

              <CardProfile
                  position={"Ketua"}
                  image={"/person.png"}
                  name={"Agus Tarwana"}
                  period={"2020-2025"}
                  address={"Jl. Raya Puspahiang No. 123"}
                  phone={"081234567890"}
              />
          </div>
      </Section>
    </main>
  );
}
