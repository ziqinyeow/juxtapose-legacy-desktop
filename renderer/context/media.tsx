import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import fs from "fs";
import path from "path";
// import { Media } from "@/components/ui/datatable/data/schema";

type Media = {
  name: string;
  path: string;
  size: number;
  label: string;
  date: number;
};

type Context = {
  images: Media[];
  videos: Media[];
  media: Media[];
  refresh: () => void;
};

const defaultValue: Context = {
  images: [],
  videos: [],
  media: [],
  refresh: () => {},
};

const context = createContext(defaultValue);

export function DataProvider({ children }: { children?: React.ReactNode }) {
  // const [images, setImages] = useState<Media[]>([]);
  // const [videos, setVideos] = useState<Media[]>([]);
  const [media, setMedia] = useState<Media[]>([]);

  const images = useMemo(() => {
    return media.filter((m) => m?.label === "image");
  }, [media]);

  const videos = useMemo(() => {
    return media.filter((m) => m?.label === "video");
  }, [media]);

  const refresh = useCallback(() => {
    if (!fs.existsSync("./media")) {
      fs.mkdirSync("./media");
    }
    if (!fs.existsSync("./media/image")) {
      fs.mkdirSync("./media/image");
    }
    if (!fs.existsSync("./media/video")) {
      fs.mkdirSync("./media/video");
    }
    if (!fs.existsSync("./media/index.json")) {
      setTimeout(() => {
        fs.writeFile("./media/index.json", JSON.stringify([]), () => {});
      }, 2000);
    }

    try {
      const metadata: Media[] = JSON.parse(
        fs.readFileSync("./media/index.json", "utf-8")
      );
      setMedia(metadata);
    } catch (error) {}
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  const value = { images, videos, media, refresh };

  return <context.Provider value={value}>{children}</context.Provider>;
}

export default function useData() {
  return useContext(context);
}
