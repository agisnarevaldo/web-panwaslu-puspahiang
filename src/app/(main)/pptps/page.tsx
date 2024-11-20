// import PPTPSForm from "@/components/admin/formPPTPS";
import SimplifiedPPTPSForm from "@/components/admin/simpleFormPPTPS";

export default function PPTPSPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pendaftaran PPTPS</h1>
            <SimplifiedPPTPSForm />
        </div>
    )
}