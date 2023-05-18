import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FolderCog, Image, Video } from "lucide-react";
import useData from "@/context/media";
import ReactTimeAgo from "react-time-ago";

function Home() {
  const { images, videos } = useData();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  });

  return (
    <React.Fragment>
      <Head>
        <title>Juxtapose</title>
      </Head>
      <main className="px-5 text-xs">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-5 border rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h6 className="">Total Video</h6>
              <Video className="w-4 h-4 text-gray-400" />
            </div>
            <h3 className="font-mono font-extrabold">{videos?.length}</h3>
            {hydrated && videos?.length > 0 && (
              <p className="font-light text-[10px] text-gray-500">
                Last Updated:{" "}
                <ReactTimeAgo
                  date={
                    videos?.sort((a: any, b: any) => b?.date - a?.date)?.[0]
                      ?.date
                  }
                  locale="en-MY"
                />
              </p>
            )}
          </div>
          <div className="p-5 border rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h6 className="">Total Image</h6>
              <Image className="w-4 h-4 text-gray-400" />
            </div>
            <h3 className="font-mono font-extrabold">{images?.length}</h3>
            {hydrated && images.length > 0 && (
              <p className="font-light text-[10px] text-gray-500">
                Last Updated:{" "}
                <ReactTimeAgo
                  date={
                    images?.sort((a: any, b: any) => b?.date - a?.date)?.[0]
                      ?.date
                  }
                  locale="en-MY"
                />
              </p>
            )}
          </div>
          <div className="p-5 border rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h6 className="">Total Media Size</h6>
              <FolderCog className="w-4 h-4 text-gray-400" />
            </div>
            <h3 className="font-mono font-extrabold">
              {Number(
                videos?.reduce((p, c) => p + c?.size, 0) +
                  images?.reduce((p, c) => p + c?.size, 0)
              ).toFixed(2)}{" "}
              MB
            </h3>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Home;
