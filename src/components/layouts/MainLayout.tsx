import { Tabs } from "~/components/Tabs";
import { Header } from "~/components/Header";

type MainLayoutProps = {
  showBackUrl?: boolean;
  showTabs?: boolean;
  children: React.ReactNode;
};

export function MainLayout({
  showBackUrl = false,
  showTabs = true,
  children,
}: MainLayoutProps) {
  return (
    <div className="p-4 px-8">
      <Header showBackUrl={showBackUrl} />
      {showTabs && <Tabs />}
      <main>{children}</main>
    </div>
  );
}
