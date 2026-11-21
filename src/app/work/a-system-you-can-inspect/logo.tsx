import { ImageGallery, type GalleryItem } from "@/design-system/components/ImageGallery";
import sketch1 from "@/assets/logo/sketch-1.png";
import sketch2 from "@/assets/logo/sketch-2.png";
import sketch3 from "@/assets/logo/sketch-3.png";
import sketch4 from "@/assets/logo/sketch-4.png";
import sketch5 from "@/assets/logo/sketch-5.png";
import sketch6 from "@/assets/logo/sketch-6.png";
import sketch7 from "@/assets/logo/sketch-7.png";
import sketch8 from "@/assets/logo/sketch-8.png";
import sketch9 from "@/assets/logo/sketch-9.png";
import rough1 from "@/assets/logo/rough-1.png";
import rough2 from "@/assets/logo/rough-2.png";
import rough3 from "@/assets/logo/rough-3.png";
import rough4 from "@/assets/logo/rough-4.png";
import rough5 from "@/assets/logo/rough-5.png";
import rough6 from "@/assets/logo/rough-6.png";
import rough7 from "@/assets/logo/rough-7.png";
import rough8 from "@/assets/logo/rough-8.png";
import rough9 from "@/assets/logo/rough-9.png";
import rough10 from "@/assets/logo/rough-10.png";
import rough11 from "@/assets/logo/rough-11.png";
import rough12 from "@/assets/logo/rough-12.png";
import rough13 from "@/assets/logo/rough-13.png";
import rough14 from "@/assets/logo/rough-14.png";
import rough15 from "@/assets/logo/rough-15.png";

/* The MagnoCreative mark, from its first sketches to its digital roughs
   (Alejandro, November 2026: show all of the sketches and the roughs, and
   tell how the logo was made). His own work, from his earlier portfolio:
   nine of the hand-drawn monograms, cut from the sheet onto white, and all
   fifteen digital roughs, cut from their grid in order, ending on the
   direction that became the mark. */

const SKETCHES: GalleryItem[] = [
  { src: sketch1, label: "Sketch 1", alt: "An M built from blocky, shaded strokes, with a small checkered F." },
  { src: sketch2, label: "Sketch 2", alt: "An A shaped like a house, with the F's arms beside it as two flags." },
  { src: sketch3, label: "Sketch 3", alt: "A rounder version of the house-shaped A and its flag F." },
  { src: sketch4, label: "Sketch 4", alt: "A folded, three-dimensional A and F sharing one fold." },
  { src: sketch5, label: "Sketch 5", alt: "An A drawn as a folded peak, half of it hatched." },
  { src: sketch6, label: "Sketch 6", alt: "A lowercase a and f joined by one long crossbar." },
  { src: sketch7, label: "Sketch 7", alt: "A triangular A beside an F cut on a slant." },
  { src: sketch8, label: "Sketch 8", alt: "An A and an F inside one triangle, partly filled in." },
  { src: sketch9, label: "Sketch 9", alt: "A slanted A and F with a heavy drop shadow." },
];

const ROUGHS: GalleryItem[] = [
  { src: rough1, label: "Rough 1", alt: "Two mountains, one gray and one black, each with a snowcap." },
  { src: rough2, label: "Rough 2", alt: "Two gray mountains with snowcaps above a rolling line." },
  { src: rough3, label: "Rough 3", alt: "A black mountain peak over two roofs, one black and one gray." },
  { src: rough4, label: "Rough 4", alt: "A gray pencil tip over three small roofs." },
  { src: rough5, label: "Rough 5", alt: "Two black peaks forming an M, a third peak between them." },
  { src: rough6, label: "Rough 6", alt: "Two black peaks forming an M, with a spiral at its center." },
  { src: rough7, label: "Rough 7", alt: "Two gray mountains drawn as pencils, with snowcaps." },
  { src: rough8, label: "Rough 8", alt: "A black pencil tip over a gray roof." },
  { src: rough9, label: "Rough 9", alt: "Two slanted black peaks forming an M." },
  { src: rough10, label: "Rough 10", alt: "A blue pencil tip over a green roof and a blue roof." },
  { src: rough11, label: "Rough 11", alt: "A blue pencil tip with a pale blue cone over three blue roofs." },
  { src: rough12, label: "Rough 12", alt: "The same pencil tip and pale cone over two roofs." },
  { src: rough13, label: "Rough 13", alt: "Two pencil-tip peaks, one black and one gray, with snowcaps." },
  { src: rough14, label: "Rough 14", alt: "A wide gray M made of two pencil tips under one roofline." },
  { src: rough15, label: "Rough 15", alt: "Two blue peaks with snowcaps forming an M: the direction that became the mark." },
];

/* Nine of the monograms, three across and three down. */
export function LogoSketches() {
  return <ImageGallery items={SKETCHES} label="First sketches for the mark" ratio="1/1" columns={3} />;
}

/* All fifteen digital roughs, three across and five down, in the order
   they were made. */
export function LogoRoughs() {
  return <ImageGallery items={ROUGHS} label="Digital roughs for the mark" ratio="4/3" columns={3} />;
}
