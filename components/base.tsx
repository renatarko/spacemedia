import Container from "./container";
import Header from "./header";

type BaseProps = {
  children: React.ReactNode;
};

export default function Base({ children }: BaseProps) {
  return (
    <div
      className="relative flex h-screen flex-col justify-between "
      style={{ backgroundPosition: "120% 110%" }}
    >
      <Header />

      <div className="relative mt-12 sm:mt-32 flex-1">{children}</div>

      <div className="bg-blue-600">
        <Container>
          <footer className="py-4 flex justify-between">
            <p className="font-extrabold">media space</p>

            <a
              className="text-blue-300"
              href="https://renatakarolina.vercel.app/"
              target="_blank"
            >
              Created by Renata Karolina
            </a>
          </footer>
        </Container>
      </div>
    </div>
  );
}
