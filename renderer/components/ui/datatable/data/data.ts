import {
  IconBallFootball,
  IconKarate,
  IconPlayBasketball,
  IconPlayFootball,
  IconQuestionMark,
  IconRun,
  IconStretching2,
  IconSwimming,
} from "@tabler/icons-react";
import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  Bike,
  CheckCircle2,
  Circle,
  CircleDot,
  CircleEllipsis,
  FileClock,
  HelpCircle,
  Image,
  Video,
  XCircle,
} from "lucide-react";

export const labels = [
  {
    value: "video",
    label: "Video",
  },
  {
    value: "image",
    label: "Image",
  },
];

export const categories = [
  {
    value: "unknown",
    label: "--",
    // icon: HelpCircle,
  },
  {
    value: "bikefit",
    label: "BikeFit",
    icon: Bike,
  },
  {
    value: "swimming",
    label: "Swimming",
    icon: IconSwimming,
  },
  {
    value: "run",
    label: "Run",
    icon: IconRun,
  },
  {
    value: "badminton",
    label: "Badminton",
    icon: IconStretching2,
  },
  {
    value: "football",
    label: "Football",
    icon: IconPlayFootball,
  },
  {
    value: "basketball",
    label: "Basketball",
    icon: IconPlayBasketball,
  },
  {
    value: "shortput",
    label: "Short Put",
    icon: IconKarate,
  },
];

export const formats = [
  {
    value: "png",
    label: "PNG",
    icon: Image,
  },
  {
    value: "jpeg",
    label: "JPEG",
    icon: Image,
  },
  {
    value: "jpg",
    label: "JPG",
    icon: Image,
  },
  {
    value: "mp4",
    label: "MP4",
    icon: Video,
  },
  {
    value: "avi",
    label: "AVI",
    icon: Video,
  },
  {
    value: "mts",
    label: "MTS",
    icon: Video,
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: FileClock,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleDot,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: CircleEllipsis,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
];
