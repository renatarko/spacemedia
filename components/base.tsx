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

      <div className="bg-white">
        <Container>
          <footer>
            <p>footer em breve</p>
          </footer>
        </Container>
      </div>
    </div>
  );
}
