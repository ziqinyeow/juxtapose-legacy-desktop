import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: string;
  onValueChange: (e: any) => void;
  list: any[];
};

export default function Selection({
  defaultValue,
  onValueChange,
  list,
}: Props) {
  return (
    <>
      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {list?.map((l, i) => (
            <SelectItem key={i} value={l?.value}>
              <div className="flex items-center">
                {l?.icon && (
                  <l.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                )}
                <span>{l?.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
