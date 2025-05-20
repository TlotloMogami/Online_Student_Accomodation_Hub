import { Outlet } from "react-router-dom"

export const Root = () => {
    return(
        <main className="flex">
            <div className="w-full">
                <Outlet/>
            </div>
        </main>
    )
}