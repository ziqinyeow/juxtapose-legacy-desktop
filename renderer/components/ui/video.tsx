import { Media, Video } from "@vidstack/player-react";

export default function MediaPlayer({ src, type }) {
  return (
    <>
      {type === "image" ? (
        <>
          <img
            className="object-contain w-full max-h-[50vh]"
            src={"file:///" + src}
            alt={src}
          />
        </>
      ) : (
        <>
          <Media className="w-full max-h-[50vh]">
            <Video controls preload="auto">
              <video src={"file:///" + src} preload="auto" controls />
            </Video>
          </Media>
        </>
      )}
    </>
  );
}
