import { fetchAllTestimonal, fetchTestimonal } from 'app/axios/actions/api.testimony';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TestimonalAction } from 'app/reducer/testimonials/testimonial';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import React, { useEffect } from 'react'
import AliceCarousel, { Classnames } from 'react-alice-carousel';
import TestimoySingle from './TestimoySingle';
import Heading from 'components/Heading/Heading';
import WaveAnimation from './WaveAnimation';
import bgBackground from 'images/Background-home3-2.svg';

export default function TestimonialSlider() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(TestimonalAction.data);
    const loading = useAppSelector(TestimonalAction.loading);
    const error = useAppSelector(TestimonalAction.error);

    useEffect(() => {
        if (!loading && !data) {
            dispatch(fetchTestimonal());
        }
    })

    if (!data || data.length == 0) return null

    return (
        <div className={`nc-SectionTestimonial relative mt-2 bg-white dark:bg-neutral-900`} data-nc-id="SectionHero">
            {loading ? (
                <div className="text-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='p-1 sm:p-4 bg-[#eee]' style={{ backgroundImage: `url(${bgBackground})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <div className="container">
                        <div className="grid sm:grid-cols-5 grid-cols-1 gap-6 pb-12" >
                            <div className="col-span-1">
                                <Heading desc={"Ce que nos clients disent"} >
                                    Témoignages
                                </Heading>

                                <div className='sm:block hidden' >
                                    <WaveAnimation />
                                </div>
                            </div>

                            <div className="col-span-4">
                                <AliceCarousel
                                    mouseTracking
                                    items={
                                        data
                                            ? data
                                                .map((item, index) => (
                                                    <div className='flex justify-center mx-2' key={index}>
                                                        <TestimoySingle item={item} />
                                                    </div>
                                                ))
                                            : []
                                    }
                                    responsive={{
                                        0: { items: 1 },
                                        1024: { items: 2 },
                                    }}
                                    controlsStrategy="alternate"
                                    autoPlay
                                    autoPlayInterval={6000}
                                    disableButtonsControls={true}
                                    disableDotsControls={false}
                                    infinite
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
