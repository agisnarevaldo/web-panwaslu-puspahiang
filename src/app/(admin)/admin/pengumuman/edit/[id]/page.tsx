import FormEditPengumuman from "@/components/admin/formEditPengumuman";

interface PageProps {
    params: {
        id: string;
    }
}

export default function Page({params}: PageProps) {
    const id = parseInt(params.id);
    return (
        <div className="container mx-auto mt-8">
            {/*<h1 className="text-2xl font-bold mb-4">Edit News Article</h1>*/}
            <FormEditPengumuman id={id} />
        </div>
    )
}