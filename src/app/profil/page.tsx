
import Section from "@/components/layout/section";
import Card from "@/components/ui/card";

export default function Page() {
  return (
    <main className="">
      <Section title="Profil" description="Profil Panwaslu Kecamatan Puspahiang" classname="py-0">
          <div className="flex flex-col pt-8 gap-8">
              <Card title="Visi" classname="">
                    <p>
                        Terwujudnya panwaslu kecamatan puspahiang sebagai pengawas atau pengawal demokrasi terpercaya dalam pemilu atau pemilihan yang demokratis, bermartabat, dan berkualitas
                    </p>
              </Card>
              <Card title="Misi">
                  <ol className="list-decimal">
                      <li>Membangun Aparatur dan kelembagaan pengawas pemilu yang kuat, mandiri dan solid;</li>
                      <li>Mengembangkan pola dan metode pengawasan yang efektif dan efisien;</li>
                      <li>Memperkuat sistem kontrol nasional dalam satu manajemen pengawasan terstruktur, sistematis, dan integratif berbasis teknoligi;</li>
                      <li>Meningkatkan keterlibatan masyarakat dan peserta pemilu, serta meningkatkan sinergi kelembagaan dalam pengawasan pemilu partisipatif;</li>
                      <li>Meningkatkan kepercayaan publik atas kualitas kinerja pengawasan berupa pencegahan dan penindakan, serta penyelesaian sengketa secara cepat, akurat dan transparan;</li>
                      <li>Membangun bawaslu sebagai pusat pembelajaran pengawasan pemilu baik bagi pihak dari dalam negeri maupun pihak dari luar negeri</li>
                  </ol>
              </Card>
          </div>
      </Section>
    </main>
  );
}
