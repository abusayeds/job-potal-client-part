import { TRole } from "@/types";
import { DashboardItem, TLinkItem } from "@/types/sidebar.type";
import { IconType } from "react-icons";

export const generateLink = (
  items: DashboardItem[],
  role: TRole
): TLinkItem[] => {
  const links = items.reduce((acc: TLinkItem[], item) => {
    if (
      item.children &&
      item.icon &&
      item.name &&
      item.path &&
      item.role?.includes(role)
    ) {
      acc.push({
        name: item.name,
        icon: item.icon,
        rootPath: item.path,
        children: item.children
          .filter(
            (child) =>
              child.name &&
              child.path &&
              child.role &&
              child.role.includes(role)
          )
          .map((child) => ({
            name: child.name as string,
            path: child.path as string,
            icon: child.icon as IconType,
          })),
      });
    } else if (
      item.path &&
      item.name &&
      item.icon &&
      item.role &&
      item.role.includes(role)
    ) {
      acc.push({
        name: item.name,
        path: item.path,
        icon: item.icon,
      });
    }
    return acc;
  }, []);
  return links;
};
