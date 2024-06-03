'use client';
import { TSuccessStory } from '@/types/common.types';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const stories = [
  {
    id: 1,
    reviewer: 'Babul Akter',
    review:
      ' Once I was in a critical condition and needed blood. I contacted Blood Bank and they arranged blood for me. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
  {
    id: 2,
    reviewer: 'Shamim Reza',
    review:
      ' I am a regular donor. I donate blood every 3 months. I am proud to be a part of this network. I encourage everyone to join this network and help save lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
  {
    id: 3,
    reviewer: 'Rebeka Ranu',
    review:
      ' I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
  {
    id: 4,
    reviewer: 'Biplob Das',
    review:
      ' By donating blood through redhope, I have saved many lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
  {
    id: 5,
    reviewer: 'Sheuly Khatun',
    review:
      ' I never thought that I would need blood. But when I needed blood, I contacted Blood Bank and they arranged blood for me. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
  {
    id: 6,
    reviewer: 'Lovely Das',
    review:
      ' Blood is the most precious gift that anyone can give to another person — the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components — red cells, platelets and plasma — which can be used individually for patients with specific conditions. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives. I am very grateful to them. They saved my life. I am now a regular donor. I donate blood whenever I can. I am proud to be a part of this network. I encourage everyone to join this network and help save lives.',
  },
];

const SuccessStories = () => {
  SwiperCore.use([Autoplay]);

  return (
    <div className="main-container py-14 lg:py-20 hidden lg:block">
      <h3 className="text-center text-3xl lg:text-4xl font-bold uppercase">
        Our Success Stories
      </h3>
      <p className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0">
        We have saved many lives by the grace of almighty. We have a large
        network of donors who are ready to donate blood whenever and wherever
        needed. We have donors from all over the world. New donors are joining
        our network every day. We are proud to have such a large network of
        donors.
      </p>
      {/* carousel */}
      <div className="swipercontainer main-container mt-8">
        <Swiper
          scrollbar
          navigation
          direction="horizontal"
          modules={[Pagination]}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {stories?.map((story: TSuccessStory) => (
            <SwiperSlide key={story.id} className="">
              <div className=" border border-gray-100 p-2 md:p-4 lg:p-8 rounded ">
                <p className="text-sm text-gray-400 font-semibold">
                  {story.review.slice(0, 300)}
                </p>
                <div className="flex justify-end mt-3">
                  <p className="text-sm text-gray-500 font-semibold">
                    {`-${story.reviewer}`}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SuccessStories;
