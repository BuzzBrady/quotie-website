interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-20 ${className}`}>
      {children}
    </div>
  );
}
