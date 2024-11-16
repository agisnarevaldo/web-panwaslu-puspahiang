import DetailBerita from "@/components/layout/detailBerita";

export default async function Page ({params} :{ params: { slug: string} }) {
    const { slug } = params;

    // fetch data berita by slug
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-deployment-url.vercel.app';
    const res = await fetch(`${baseUrl}/api/pengumuman/detail/${slug}`);
    const data = await res.json();
    if (!data.success) {
        return <p>{data.message}</p>;
    }



    const pengumuman = data.data;
    return (
        <main className="">
            <DetailBerita
                date={pengumuman.tglDibuat}
                title={pengumuman.judul}
                author={pengumuman.author}
                content={pengumuman.isi}
                link={pengumuman.lampiran}
                backUrl={'/pengumuman'}
            />
        </main>
    );
}