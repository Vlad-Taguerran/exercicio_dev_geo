import AppBarComponent from "@/components/appbar/AppBar.component";
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return ( 
   
       <DashboardLayout
       defaultSidebarCollapsed
       slots={{
        toolbarActions: AppBarComponent
       }}
       >
      {children}
      </DashboardLayout>

  );
}