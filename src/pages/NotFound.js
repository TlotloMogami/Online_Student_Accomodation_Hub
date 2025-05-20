import { Undo2 } from "lucide-react"
import { Footer } from "../components/common/Footer"
import { Navbar } from "../components/common/Navbar"
import { useLocation } from "react-router-dom"

export const NotFound = () => {

    const location = useLocation()

    return(
        <main>
            <Navbar/>
            <section className="h-[90vh]">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-2 mb-10">
                        <p className="text-2xl font-light text-neutral-300">{location.pathname}</p>
                        <h1 className="text-8xl">404</h1>
                        <span className="text-2xl">Page Not Found</span>
                    </div>
                    <p className="mb-10 text-neutral-400">The page your looking for was not found.</p>
                    <a href="/" className="flex flex-row gap-2 items-center bg-black text-white rounded-full w-fit px-4 py-2">Return Home <Undo2/></a>
                </div>
            </section>
            <Footer/>
        </main>
    )
}