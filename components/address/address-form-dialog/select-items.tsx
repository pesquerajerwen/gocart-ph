import { SelectItem } from "@/components/ui/select";
import { Fragment, memo } from "react";

interface SelectItemsProps<T> {
  items: T[] | undefined;
  valueKey?: keyof T;
  labelKey?: keyof T;
}

function SelectItems<T extends Record<string, any>>({
  items,
  valueKey = "value",
  labelKey = "label",
}: SelectItemsProps<T>) {
  if (!items?.length) return null;

  return (
    <Fragment>
      {items.map((item, index) => (
        <SelectItem key={index} value={String(item[valueKey])}>
          {String(item[labelKey])}
        </SelectItem>
      ))}
    </Fragment>
  );
}

export default memo(SelectItems);
