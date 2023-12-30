"use client";

import Base from "@/components/base";
import Container from "@/components/container";
import { Instagram, Link2Icon, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tilt } from "react-tilt";
import { Autoplay, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { defaultOptions, homeImagesCel } from "@/functions/constant";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  return (
    <Base>
      <Container>
        <section className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between pb-28 mt-20 sm:mt-0">
          <div className="sm:mt-16 md:w-[50%] sm:w-[80%] text-center sm:text-start">
            <h1 className="text-xl font-bold text-blue-600">media space</h1>
            <h2 className="sm:text-5xl text-3xl mt-6 font-bold sm:leading-normal mb-12">
              The{" "}
              <b className="relative before:w-full before:z-[-1] before:bottom-1 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
                easier way
              </b>{" "}
              to have all your contacts linked.
            </h2>

            <Link
              href="/login"
              className="bg-blue-600 text-white rounded-md py-3 px-8"
            >
              Start now
            </Link>
          </div>

          <div className="max-w-[17rem] w-full mt-20 sm:mt-12 self-center ">
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
                      className={`w-full self-center h-full flex bg-gradient-to-l shadow-xl rounded-2xl items-center flex-col ${item.background.first} ${item.background.second} ${item.background.shadow}`}
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
                            className={`w-full drop-shadow-lg mt-2 p-2 rounded-full text-center font-bold ${item.buttons.color} ${item.buttons.background}`}
                          >
                            {link}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`absolute left-16 bottom-[-2rem] flex gap-3  p-2 rounded-lg shadow-xl ${item.icons.containerBg}`}
                    >
                      <span
                        className={`p-3 rounded-full ${item.icons.background} ${item.icons.color}`}
                      >
                        <Instagram />
                      </span>
                      <span
                        className={`p-3 rounded-full ${item.icons.background} ${item.icons.color}`}
                      >
                        <Youtube />
                      </span>
                      <span
                        className={`p-3 rounded-full ${item.icons.background} ${item.icons.color}`}
                      >
                        <Link2Icon />
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Tilt>
          </div>
        </section>
      </Container>
    </Base>
  );
}
