import React from 'react'
import { assets } from '../assets/assets'
import { InteractiveHoverButton } from './ui/interactive-hover-button'
import { MorphingText } from './ui/morphing-text'



const Header = () => {

    const texts = [
        "Trusted",
        "Skilled",
        "Experienced",
        "Professional",
        "Caring",
        "Qualified",
    ];




    return (

        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>
            <div className="lg:w-1/2 flex flex-col items-start justify-center gap-4 m:auto md:py-[10vw] md:mb-[-30px] ">
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                    Book an <br /> appointment with a{" "}
                </p>
                <span className="hidden lg:inline-block align-middle ">
                    <MorphingText texts={texts} className="text-white  h-min w-min" />
                </span>
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight lg:-mt-16">
                    doctor
                </p>

                <div className="flex flex-col flow-row items-center text-white text-sm font-light ">
                    <p>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
                </div>
                <a href="#speciality">
                    <InteractiveHoverButton>Book appointment</InteractiveHoverButton>
                </a>
            </div>

            <div className="relative md:w-1/2 top-28 ">
            </div>
        </div>


    )
}

export default Header