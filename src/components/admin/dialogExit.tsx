'use client';

import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {LogOutIcon} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/logout";
import Logo from "@/components/logo";

export default function DialogExit() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setOpen(false);
        router.push('/');
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full" asChild>
                <Button>
                    Keluar
                    <LogOutIcon/>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Keluar Dari Aplikasi?</DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex justify-center my-4">
                    <Logo/>
                </DialogDescription>
                <DialogFooter className="items-center">
                    <DialogClose asChild>
                        {/* cancel button */}
                        <Button type="button" variant="secondary">
                            Batal
                        </Button>
                    </DialogClose>

                    {/* confirm button */}
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleLogout}
                    >
                        Lanjutkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}