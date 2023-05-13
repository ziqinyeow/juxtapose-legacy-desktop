import { ArrowLeft, Home, PanelRight, Video } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Str2Icon from "../Str2Icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserAvatar from "../ui/useravatar";
import Store from "electron-store";
import { SearchCommand } from "../SearchCommand";

interface Props {
  children: React.ReactNode;
}

const store = new Store();

export const nav = [
  {
    name: "Home",
    icon: <Home className="w-4 h-4" />,
    link: "/home",
  },
  {
    name: "Video",
    icon: <Video className="w-4 h-4" />,
    link: "/video",
  },
];

const History = ({ className }: any) => {
  const router = useRouter();

  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(0);

  useEffect(() => {
    setHistory([...history, router.pathname]);
    setHistoryIdx(history.length);
  }, [router.pathname]);

  return (
    <>
      <div className={className}>
        <button
          onClick={() => {
            setHistory(history.slice(0, history.length - 2));
            setHistoryIdx(historyIdx - 1);
            router.push(history[historyIdx - 1]);
          }}
          disabled={history.length <= 1 || historyIdx < 0}
          className="p-1 text-gray-600 rounded-lg cursor-pointer disabled:bg-inherit disabled:text-gray-300 hover:bg-gray-100 hover:text-gray-800"
        >
          <ArrowLeft className="w-[14px] h-[14px]" />
        </button>
        {/* <button
          onClick={() => {}}
          disabled={history?.length == 1 || historyIdx + 1 == history?.length}
          className="p-1 text-gray-600 rounded-lg cursor-pointer disabled:bg-inherit disabled:text-gray-300 hover:bg-gray-100 hover:text-gray-800"
        >
          <ArrowRight className="w-[14px] h-[14px]" />
        </button> */}
      </div>
    </>
  );
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const routes = router.pathname
    ?.split("/")
    ?.slice(1, router.pathname?.split("/")?.length);
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <div className="grid h-[100vh] md:grid-cols-[200px_auto]">
        <div className="bg-gray-50">
          <div className="grid grid-rows-[64px_auto]">
            <div className="flex items-center justify-end h-full gap-2 px-4">
              <button
                onClick={() => {
                  setCollapse(!collapse);
                }}
                className="p-1 text-gray-600 bg-gray-200 rounded-lg cursor-pointer hover:text-gray-800 hover:bg-gray-300"
              >
                <PanelRight className="w-[14px] h-[14px]" />
              </button>
            </div>
            <div className="px-4 space-y-2">
              {nav?.map((n, i) => (
                <Link key={i} href={n?.link}>
                  <a
                    className={cn([
                      "flex items-center w-full gap-2 px-4 py-2 hover:text-gray-900 text-xs text-left transition-all rounded-lg hover:bg-gray-100",
                      n?.link === router.pathname && "bg-gray-100",
                    ])}
                  >
                    <span className="text-gray-600">{n?.icon}</span>
                    <span>{n?.name}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-[64px_auto]">
          <div className="flex items-center justify-between h-full px-4 border-b">
            <div className="flex items-center">
              <History className="mr-4" />
              <div className="flex items-center gap-2 text-xs">
                {routes?.map((p, i) => (
                  <h6 key={i} className="flex items-center gap-2">
                    {/* <Str2Icon str={"home"} className="w-4 h-4" /> */}
                    <span>{p}</span>
                    {i + 1 !== routes.length && <span>/</span>}
                  </h6>
                ))}
              </div>
            </div>
            <div className="flex items-center h-full gap-5">
              <SearchCommand />
              <UserAvatar />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
