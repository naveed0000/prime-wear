import { Container, CssBaseline } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";

interface RootLayoutProps extends PropsWithChildren {
  headers: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}
export default function layout({ headers, children, footer }: RootLayoutProps) {
  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: "1700px" }}>
        <CssBaseline />
        {headers}
        {children}
        {footer}
      </Container>
    </>
  );
}
