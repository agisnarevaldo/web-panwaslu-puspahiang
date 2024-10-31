import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {LogOutIcon} from "lucide-react";

export default function DialogExit() {
    return (
        <Dialog>
            <DialogTrigger className="w-full" asChild>
                <Button>
                    Keluar
                    <LogOutIcon/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Keluar Dari Aplikasi?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive">
                        Lanjutkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}