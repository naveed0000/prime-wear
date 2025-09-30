import { Container, CssBaseline } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";

interface RootLayoutProps extends PropsWithChildren {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}
export default function layout({ header, children, footer }: RootLayoutProps) {
  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: "1700px" }}>
        <CssBaseline />
        {header}
        {children}
        {footer}
      </Container>
    </>
  );
}
