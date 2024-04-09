'use client'

import { Instagram, Link2Icon, Youtube } from "lucide-react";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { Autoplay, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { defaultOptions, homeImagesCel } from "@/functions/constant";


export const AutoSlider = () => {
  return (
    <div className="max-w-[17rem] animate-float w-full mt-20 sm:mt-12 self-center ">
      <Tilt options={defaultOptions}>
        <Swiper
          modules={[EffectFlip, Autoplay]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          effect="flip"
          slidesPerView={1}
          spaceBetween={80}
          grabCursor={true}
        >
          {homeImagesCel.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className={`w-full self-center h-full flex bg-gradient-to-l shadow-xl rounded-2xl items-center flex-col ${item.background.shadow}`}
                style={{
                  background: `linear-gradient(to left, ${item.background.first}, ${item.background.second})`,
                  boxShadow: `-1px 5px 19px 3px ${item.background.shadow}`,
                }}
              >
                <div className="w-24 h-24 rounded-full sm:mt-16 mt-8 overflow-hidden">
                  <Image
                    src={item.image}
                    alt="image"
                    width={150}
                    height={150}
                    className=""
                  />
                </div>

                <div className="mt-8 text-white px-8 md:px-12 text-center">
                  <h1 className="text-xl font-bold drop-shadow-lg">
                    {item.title}
                  </h1>
                  <h2 className="drop-shadow-lg">{item.career}</h2>
                </div>

                <ul className="w-full px-4 mt-6 pb-10">
                  {item.buttons.link.map((link, i) => (
                    <li
                      key={i}
                      className={`w-full drop-shadow-lg mt-2 p-2 rounded-full text-center font-bold`}
                      style={{
                        background: item.buttons.background,
                        color: item.buttons.color,
                      }}
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`absolute left-16 bottom-[-2rem] flex gap-3 p-2 rounded-lg shadow-xl`}
                style={{ background: item.icons.containerBg }}
              >
                <span
                  style={{
                    background: item.icons.background,
                    color: item.icons.color,
                  }}
                  className={`p-3 rounded-full`}
                >
                  <Instagram />
                </span>
                <span
                  style={{
                    background: item.icons.background,
                    color: item.icons.color,
                  }}
                  className={`p-3 rounded-full`}
                >
                  <Youtube />
                </span>
                <span
                  style={{
                    background: item.icons.background,
                    color: item.icons.color,
                  }}
                  className={`p-3 rounded-full`}
                >
                  <Link2Icon />
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Tilt>
    </div>
  )
}