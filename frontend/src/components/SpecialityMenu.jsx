import React from 'react'
import { specialityData } from '@/assets/assets'
import { FocusCards } from './ui/focus-cards'



const SpecialityMenu = () => {

    // const cards = [
    //     {
    //         title: "Forest Adventure",
    //         src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         title: "Valley of life",
    //         src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         title: "Sala behta hi jayega",
    //         src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         title: "Camping is for pros",
    //         src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         title: "The road not taken",
    //         src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         title: "The First Rule",
    //         src: "/src/assets/Gastroenterologist.svg",
    //     },
    // ];

    const cards = specialityData.map((item, index) => ({
        title: item.speciality,
        src: item.image,
        index: index,
    }));




    return (
        <div id='speciality' className='flex flex-col items-center gap-4 text-gray-800 py-14'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>

            <FocusCards cards={cards} />
            {/* <div className="flex flex-rom gap-4 sm:justify-center pt-5 w-full overflow-scroll ">
                {specialityData.map((item, index) => (
                    <Link onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' to={`/doctors/${item.speciality}`} key={index}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div> */}

        </div>
    )
}

export default SpecialityMenu