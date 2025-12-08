import { useMediaQuery } from "@/hooks/use-media-query";

export function useIsMobile(query: string = "(max-width: 768px)") {
  return useMediaQuery(query);
}
