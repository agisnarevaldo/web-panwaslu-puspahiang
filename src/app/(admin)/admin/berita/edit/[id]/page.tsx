import FormEditBerita from "@/components/admin/formEditBerita";

export default function Page({params}: { params: { id: string } }) {
    return (
        <div className="container mx-auto mt-8">
            {/*<h1 className="text-2xl font-bold mb-4">Edit News Article</h1>*/}
            <FormEditBerita id={params.id} />
        </div>
    )
}