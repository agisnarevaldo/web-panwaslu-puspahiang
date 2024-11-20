import FormEditAnggota from "@/components/admin/formEditAnggota";

export default function Page({params}: { params: { id: string}}) {
    return (
        <div className="container mx-auto mt-8">
            <FormEditAnggota id={params.id} />
        </div>
    )
}