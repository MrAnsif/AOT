import React from 'react'
import { ShinyButton } from './ui/shiny-button'
import PixelCard from './ui/PixelCard'

const Banner = () => {
    return (
        <div className="banner-container text-center py-12  mb-6">
            <PixelCard variant='blue' className='w-[89%] mx-auto bg-black'>
                <div className=" absolute banner-content max-w-xl mx-auto">
                    <h1 className="text-4xl text-gray-100 pb-3 ">Doctor's Blog</h1>
                    <p className="text-lg text-gray-100 mt-4">Stay updated with the latest health tips and news from our expert doctors.</p>
                    <ShinyButton
                        onClick={() => window.location.href = '/blog'}
                        className='mt-6 text-white bg-white'
                    >
                        Visit Blog
                    </ShinyButton>


                </div>
            </PixelCard>

        </div>
    )
}

export default Banner