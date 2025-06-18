import { ProgressProvider } from "@bprogress/next/pages";
import { useMemo } from "react";
const Providers = ({
  children,
  dir,
}: {
  children: React.ReactNode;
  dir: string;
}) => {
  const options = useMemo(
    () => ({
      showSpinner: false,
      direction: dir as "rtl" | "ltr",
    }),
    [dir]
  );
  return (
    <ProgressProvider
      height="5px"
      color="hsl(var(--secondary))"
      options={options}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default Providers;
