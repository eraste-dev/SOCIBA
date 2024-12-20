import { ITestimonial } from 'app/reducer/testimonials/testimonial'
import Avatar from 'components/Avatar/Avatar'
import SocialsList from 'components/SocialsList/SocialsList'
import React, { FC } from 'react'

export interface TestimoySingleProps {
    item: ITestimonial
}

const TestimoySingle: FC<TestimoySingleProps> = ({ item }) => {
    if (!item) return null

    return (
        <div className=" bg-white dark:bg-neutral-900 p-2 rounded-lg flex ">
            <div className="p-3 space-y-4 max-w-lg">
                <div className='flex items-center' >
                    <Avatar
                        containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
                        imgUrl={item.user?.avatar}
                        sizeClass="w-10 h-10 sm:w-12 sm:h-12 text-xl mr-3"
                        radius="rounded-full"
                    />

                    <div>
                        <h2 className="inline-block text-lg font-semibold">
                            {`${item.user?.name} ${item.user?.last_name}`}
                        </h2>
                        <p>
                            {item.user?.fonction}
                        </p>
                    </div>
                </div>

                <div
                    className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base prose" dangerouslySetInnerHTML={{ __html: item.message }}
                />
            </div>
        </div>
    )
}

export default TestimoySingle;
