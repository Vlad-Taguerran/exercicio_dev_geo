import AppBarComponent from "@/components/appbar/AppBar.component";
import { Box } from "@mui/material";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return ( 
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <AppBarComponent/>
      {children}
    </Box>
  );
}