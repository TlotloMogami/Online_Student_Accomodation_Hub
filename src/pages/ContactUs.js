import { Footer } from "../components/common/Footer"
import { Navbar } from "../components/common/Navbar"
import REPORT_ICON from '../assets/report_ic.svg'
import HELP_ICON from '../assets/help_ic.svg'
import ILLUSTRATION from '../assets/contact_us_illustration.svg'

export const ContactUs = () => {
    return(
        <>
        <Navbar/>
            <main className=" min-h-svh">
                {/* <Navbar/> */}
                <section className="flex flex-col gap-2 items-center py-20">
                    <img src={ILLUSTRATION} alt="" className="w-1/3"/>
                    <h2 className="text-4xl">Contact Us</h2>
                    <span className="text-[#666666]">Osah your gateway to student residences</span>
                    <div className="grid grid-cols-1 gap-2 sm:grid sm:grid-cols-2 sm:gap-3 w-full px-10 mt-10">
                        <div className="flex flex-col items-center border shadow-sm rounded-sm w-full gap-3 py-10">
                            <img src={REPORT_ICON} alt="" className="w-20"/>
                            <span className="text-[#585858] font-bold text-xl">Need to report an issue?</span>
                            <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 text-sm">
                                    <span className="font-bold">Fraud:</span>
                                    <span>+27 123 271 123</span>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center border shadow-sm rounded-sm w-full gap-3 py-10">
                            <img src={HELP_ICON} alt="" className="w-16 mt-4"/>
                            <span className="text-[#585858] font-bold text-xl">Need Direct Support?</span>
                            <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 text-sm">
                                    <span className="font-bold">General Help:</span>
                                    <span>+27 123 271 123</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Footer/> */}
            </main>
        <Footer/>
        </>

    )
}