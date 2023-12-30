import { BrandingOptions } from "adminjs";
import tinycolor from "tinycolor2";

// Função para criar a graduação de cores com base na cor primária --- verde da compasss
const generateColors = (primaryColor: string) => {
  const primary = tinycolor(primaryColor);
  return {
    primary100: primary.toHexString(),
    primary80: primary.darken(5).toHexString(),
    primary60: primary.darken(10).toHexString(),
    primary40: primary.darken(15).toHexString(),
    primary20: primary.darken(20).toHexString(),
  };
};

const primaryColor = "#2da837";
const accentColor = "#9ac553";

export const brandingOptions: BrandingOptions = {
  companyName: "Portal Compasss",
  logo: "/compasss-icon.png",
  theme: {
    colors: {
      ...generateColors(primaryColor),
      grey100: "#151515",
      grey80: "#333333",
      grey60: "#4d4d4d",
      grey40: "#666666",
      grey20: "#dddddd",
      filterBg: "#333333",
      accent: accentColor,
      hoverBg: "#151515",
    },
  },
  softwareBrothers: false,
  favicon: "/compasss-icon-2.png",
};
