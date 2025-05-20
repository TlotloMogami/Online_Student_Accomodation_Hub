import { useEffect, useState } from "react"
import { useAuth } from "../../../components/auth/AuthProvider"
import { supabase } from "../../../App"
import { MahikengResidences } from "../../../data/residences/residences"
import NO_DATA from '../../../assets/no_data.svg'

export const MyApplicationsPage = () => {

    const {user} = useAuth()

    const [applications, setApplications] = useState([])
    const [localItems, setLocalItems] = useState([])

    useEffect(()=>{

        const fetchApplications = async () => {
            try{

                
                // Query the applications table where user_id matches the current user
                const { data, error } = await supabase
                .from('applications')
                .select('*')
                .eq('user_id', user.id);  // Filter by user_id

                console.log(data)

                if(error){
                    throw error
                }

                setApplications(data)

            }catch(error){

            }
        }

        fetchApplications()
        
        
    },[])

    return(
        <main className="px-4">
            <div>
                <div className="flex flex-ro items-center gap-4">
                    <h2 className="font-medium text-lg text-[#464646]">My Applications</h2>
                    <span className="text-sm text-[#929292]">({applications.length})</span>
                </div>
                <div className="bg-[#e2e2e2] h-[1px] mt-2"></div>
            </div>

            {applications.length > 0 ? 

            <div className="grid grid-cols-3 py-2">

            {applications.map((application) => {
                return(
                    <div className="flex flex-col gap-2 border border-[#f2f2f2] p-4 hover:shadow-sm pb-2 w-fit">
                    <img src={MahikengResidences[application.res_id].image} alt="img" className="w-52"/>
                    <div className="flex flex-col">
                        <span className="font-medium text-lg">{MahikengResidences[application.res_id].name}</span>
                        <span className="text-xs text-[#868686]">{MahikengResidences[application.res_id].location}</span>
                    </div>
                    <div className="flex flex-row gap-2 text-xs justify-between">
                        <span className="font-bold">Status:</span>
                        <span className="text-orange-500">Pending Review</span>
                    </div>
                    </div>
                )
            })
            }

            </div>

            :

            <div className="border mt-4 rounded-md border-dotted bg-[#f9f9f9] h-[450px] w-full flex flex-col gap-4 items-center justify-center">
                <img src={NO_DATA} alt="" className="w-28"/>
                <span className="text-[#898989]">You currently have no active applications</span>
            </div>

            }

        </main>
    )
}