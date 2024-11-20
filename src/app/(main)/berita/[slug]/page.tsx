import DetailBerita from "@/components/layout/detailBerita";

export default async function Page ({params} :{ params: { slug: string} }) {
    const { slug } = params;

    // fetch data berita by slug
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-deployment-url.vercel.app';
    const res = await fetch(`${baseUrl}/api/${slug}`);
    const data = await res.json();

    const berita = data.data;
    return (
        <main className="">
            <DetailBerita
                title={berita.judul}
                image={berita.gambar}
                date={berita.tglDibuat}
                author={berita.author}
                content={berita.isi}
                backUrl={'/berita'}
            />
        </main>
    );
}