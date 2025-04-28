import Image from 'next/image';
import cloudImage from '../../../public/cloudHosting.png'
import type { Metadata } from "next";
const AboutPage = () => {
    return (
        <section className='fix-height container m-auto'>
            <h1 className='text-3xl font-bold text-gray-800 p-5'>
                About Page
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quidem dolorum odio quia magni voluptas! Harum, numquam reprehenderit. Excepturi repellat harum pariatur, exercitationem veritatis obcaecati temporibus ducimus doloribus! Vitae, repellat.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus ratione voluptatibus quas excepturi? Nobis nemo cumque, debitis repudiandae sint doloribus eaque aliquam veniam ipsam officia maxime! Consectetur harum repellendus quidem.
            </p>
            <div>
                <Image
                    src={cloudImage}
                    alt='cloud'
                    width={500}
                    height={500}
                    priority
                />
            </div>
        </section>
    )
}

export default AboutPage

export const metadata: Metadata = {
    title: "About Page",
    description: "This is about info",
};