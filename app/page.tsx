import Base from "@/components/base";
import Container from "@/components/container";
import Button from "@/components/button";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Metadata } from "next";
import { AutoSlider } from "@/components/autoSlider";
export const metadata: Metadata = {
  title: 'Media Space - Centralize Your Contacts and Social Media',
  description: 'Create a centralized space to easily manage all your contacts and social media. With Media Space, you can organize your contact information and social media links in one convenient place. Simplify your online presence and stay connected with those who matter.',
}

export default function Home() {
  const getCookie = async () => {
    try {
      const data = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: "token", uid: "uid" }),
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Base>
      <Container>
        <section className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between pb-28 mt-20 sm:mt-0">
          <div className="sm:mt-16 md:w-[50%] sm:w-[80%] text-center sm:text-start flex flex-col gap-6">
            <div className="w-full my-6">
              <h1 className="text-xl font-bold text-blue-600 mb-6">
                media space
              </h1>
              <h2 className="sm:text-5xl text-3xl font-bold">
                The{" "}
                <b className="relative before:w-full before:z-[-1] before:bottom-0 sm:before:bottom-2 before:absolute before:bg-[#EAB308] before:left-0 before:h-4">
                  easier way
                </b>{" "}
                to have all your contacts linked.
              </h2>
            </div>

            <p className="text-lg">
              Connect with ease by centralizing all your contact information and
              social media links in one convenient place.
            </p>

            <p className="text-lg">
              Our platform empowers you to effortlessly share and manage your
              contact details, making it simpler for others to reach out to you.
            </p>

            <Button isAnchor path="/login" minWidth>
              Start now
            </Button>
          </div>

          <AutoSlider />
        </section>
      </Container>
    </Base>
  );
}
