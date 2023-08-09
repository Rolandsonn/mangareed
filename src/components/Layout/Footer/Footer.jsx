import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import Logo from "../../UI/Logo/Logo";
import { icons, links, linksSettings } from "./footerElems";

const Footer = () => {
  return (
    <Box>
      <Box sx={{ background: "#FFFFFF", borderBottom: "1px solid #bbb" }}>
        <Container
          fixed
          sx={{ "&.MuiContainer-root": { padding: 0, maxWidth: 1240 } }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "30px 0",
            }}
          >
            <Logo className={"subtitle"} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                rowGap: "32px",
              }}
            >
              {links.map((item, i) => {
                return (
                  <Box
                    key={item}
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Link
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: 600,
                        fontFamily: "Roboto",
                        textDecoration: "none",
                      }}
                      href="#"
                    >
                      <img src={icons[i]} alt="#" />
                      <Typography
                        variant="a"
                        sx={{
                          fontWeight: 600,
                          fontFamily: "Roboto",
                          color: "#000",
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.340020968551!2d-122.4210715707394!3d37.77831718101621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580997aeae663%3A0xb2706dff83574f4a!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2skg!4v1691209013012!5m2!1sen!2skg"
              width="400"
              height="250"
              style={{ borderRadius: 20, border: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Container>
      </Box>

      <Box sx={{ padding: "40px 0" }}>
        <Box
          sx={{ display: "flex", columnGap: "24px", justifyContent: "center" }}
        >
          <Typography
            variant="span"
            sx={{ fontFamily: "Roboto", fontSize: 14 }}
          >
            ©2022, All right reserved.
          </Typography>

          {linksSettings.map((link) => (
            <Typography
              key={link}
              variant="a"
              sx={{ fontFamily: "Roboto", fontSize: 14 }}
            >
              <Link
                underline="none"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 14,
                  color: "#000",
                  textDecoration: "underline",
                }}
                href="#"
              >
                {link}
              </Link>
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
