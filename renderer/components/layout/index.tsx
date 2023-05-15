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
      <div
        className={cn([
          "grid h-[100vh] md:grid-cols-[200px_auto]",
          collapse
            ? "grid-cols-[72px_auto] md:grid-cols-[72px_auto]"
            : "grid-cols-[150px_auto]",
        ])}
      >
        <div
          className={cn([
            "bg-gray-50 transition-transform .3s ease-in-out md:-translate-x-0",
            collapse && "-translate-x-0",
          ])}
        >
          <div className="grid grid-rows-[64px_auto]">
            <div className="flex items-center justify-end h-full gap-2 px-4">
              <button
                onClick={() => {
                  setCollapse(!collapse);
                }}
                className={cn([
                  "hidden p-1 text-gray-600 bg-gray-200 rounded-lg cursor-pointer md:block hover:text-gray-800 hover:bg-gray-300",
                  collapse && "md:hidden",
                ])}
              >
                <PanelRight className="w-[14px] h-[14px]" />
              </button>
            </div>
            <div className="px-4 space-y-2">
              {nav?.map((n, i) => (
                <Link key={i} href={n?.link}>
                  <a
                    className={cn([
                      "flex items-center w-full gap-2 hover:ring-2 ring-gray-200 hover:text-black text-gray-400 text-xs text-left transition-all rounded-lg hover:bg-gray-100",
                      n?.link === router.pathname && "bg-gray-100 text-black",
                      collapse
                        ? "justify-center py-3"
                        : "px-4 py-2 md:py-2 md:justify-start",
                    ])}
                  >
                    <span className="">{n?.icon}</span>
                    {!collapse && <span className="">{n?.name}</span>}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-rows-[64px_auto]">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setCollapse(!collapse);
                }}
                className={cn([
                  "block p-1 mr-5 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-800 hover:bg-gray-100",
                  collapse && "md:block",
                ])}
              >
                <PanelRight className="w-[14px] h-[14px]" />
              </button>
              {/* <History className="flex items-center mr-4" /> */}
              <div className="flex items-center gap-2 ml-3 text-xs">
                {routes?.map((p, i) => (
                  <h6 key={i} className="flex items-center gap-2">
                    {/* <Str2Icon str={"home"} className="w-4 h-4" /> */}
                    <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
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
