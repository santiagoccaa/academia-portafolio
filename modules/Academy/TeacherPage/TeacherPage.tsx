import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TitlePage } from "@/components/Shared"
import { Plus, UserPen } from "lucide-react"
import { Button } from "@/components/ui/button"

export const TeacherPage = () => {
    return (
        <div className="w-full p-4 space-y-4">
            <TitlePage
                icon={UserPen}
                title="Profesores"
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Crear curso
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TitlePage>
        </div>
    )
}

