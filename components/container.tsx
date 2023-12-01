type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
      {children}
    </div>
  );
}
