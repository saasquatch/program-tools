import { useEffect, useState } from "@saasquatch/universal-hooks";

export function useTab() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return setOpen(!open);
  }, []);

  return {
    state: {
      open,
    },
    callbacks: {
      setOpen,
    },
  };
}
