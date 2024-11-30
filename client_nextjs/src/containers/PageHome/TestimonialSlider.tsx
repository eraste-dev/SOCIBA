import { fetchAllTestimonal, fetchTestimonal } from 'app/axios/actions/api.testimony';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TestimonalAction } from 'app/reducer/testimonials/testimonial';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import React, { useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import TestimoySingle from './TestimoySingle';
import Heading from 'components/Heading/Heading';

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
        <div className={`nc-SectionTestimonial relative my-2`} data-nc-id="SectionHero">
            {loading ? (
                <div className="text-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='px-5 py-2'>

                    <Heading desc={""} >
                        Témoignages
                    </Heading>

                    <AliceCarousel
                        mouseTracking
                        items={
                            data
                                ? data
                                    .map((item, index) => (
                                        <div className='flex justify-center' key={index}>
                                            <TestimoySingle item={item} />
                                        </div>
                                    ))
                                : []
                        }
                        responsive={{
                            0: { items: 1 },
                            1024: { items: 1 },
                        }}
                        controlsStrategy="alternate"
                        autoPlay
                        autoPlayInterval={3000}
                        disableButtonsControls={true}
                        disableDotsControls={true}
                        infinite
                    />
                </div>
            )}
        </div>
    )
}
