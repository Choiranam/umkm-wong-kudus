import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import HeroContent from "../components/HeroContent";
import ArtikelCard from "../components/ArtikelCard";
import { dummyArticles } from "./ArtikelPage";
import { Icon } from "@iconify/react";

const DetailArtikelPage = () => {
  const { category, slug } = useParams();

  // Fungsi slugify
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  // Format tanggal utama
  const formatMainDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00+07:00`); // WIB
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `Admin • ${day}/${month}/${year} • ${hours}.${minutes} WIB — diupload oleh admin`;
  };

  // Format tanggal sidebar
  const formatSidebarDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00+07:00`);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${date.toLocaleDateString(
      "id-ID",
      options
    )} • ${hours}.${minutes} WIB`;
  };

  // Cari artikel berdasarkan URL
  const article = dummyArticles.find(
    (a) =>
      a.category.toLowerCase() === category.toLowerCase() &&
      slugify(a.title) === slug
  );

  if (!article) {
    return (
      <div className="bg-light min-h-screen font-poppins">
        <Navbar />
        <PageContainer variant="default" className="py-20 text-center">
          <h1 className="text-2xl font-bold text-dark mb-3">
            Artikel tidak ditemukan
          </h1>
          <p className="text-dark">
            Artikel yang kamu cari mungkin sudah dihapus atau URL-nya salah.
          </p>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  // Dummy isi artikel
  const articleContent = `
    They abbreviated "dolorem" (meaning "pain") to "lorem," which carries no meaning in Latin.
    "Ipsum" translates to "itself," and the text frequently includes phrases such as
    "consectetur adipiscing elit" and "ut labore et dolore." These Latin fragments, derived
    from Cicero’s philosophical treatise, were rearranged to create the standard dummy text
    that has become a fundamental tool in design and typography across generations.
    The short answer is that lorem ipsum text doesn’t actually "say" anything meaningful.
    It’s deliberately scrambled Latin that doesn’t form coherent sentences. While it comes
    from Cicero’s "De Finibus Bonorum et Malorum," the text has been modified so extensively
    that it’s nonsensical.
    Why scrambled text? That’s exactly the point. By using text that’s unreadable but maintains
    the general pattern of regular writing — including normal word length, spacing, and punctuation —
    designers can focus on the visual elements of a layout without the actual content getting
    in the way. The pseudo-Latin appearance gives it a natural feel while ensuring it won’t distract
    from the design itself.
  `;

  const articleLength = articleContent.length;
  let relatedCount = 3;
  if (articleLength < 600) relatedCount = 4;
  else if (articleLength < 1200) relatedCount = 3;

  const relatedArticles = dummyArticles
    .filter((a) => a.title !== article.title)
    .slice(0, relatedCount);

  return (
    <div className="bg-light min-h-screen font-poppins">
      <Navbar />
      <HeroContent image={article.image} title={article.title} />

      <PageContainer
        variant="default"
        className="flex flex-col lg:flex-row gap-10 mt-8"
      >
        {/* Kiri: Artikel utama */}
        <div className="lg:w-2/3">
          {/* Breadcrumb */}
          <div className="text-sm text-dark/70 mb-4">
            <span className="text-orange cursor-pointer hover:underline">
              Artikel
            </span>
            {" > "}
            <span className="text-dark/70">{article.category}</span>
            {" > "}
            <span className="text-dark font-medium">{article.title}</span>
          </div>

          {/* Info penulis */}
          <div className="flex items-center gap-2 text-sm text-dark/50 mb-6">
            <Icon icon="mdi:account" className="text-orange text-base" />
            <span>{formatMainDate(article.date || article.displayDate)}</span>
          </div>

          {/* Isi Artikel */}
          <div className="text-dark leading-relaxed space-y-4">
            {articleContent
              .trim()
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((p, i) => (
                <p key={i}>{p.trim()}</p>
              ))}
          </div>
        </div>

        {/* Kanan: Share + Artikel lain */}
        <div className="lg:w-1/3 flex flex-col">
          {/* Share */}
          <div className="flex items-center gap-3 mb-6 ml-10">
            <span className="text-dark font-bold">Bagikan:</span>

            <a
              href="#"
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="mingcute:link-line"
                className="w-full h-full text-dark"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="basil:whatsapp-solid"
                className="w-full h-full"
                color="#25D366"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="mdi:facebook"
                className="w-full h-full"
                color="#1877F2"
              />
            </a>
          </div>

          {/* Artikel lain */}
          <div className="w-full">
            <h3 className="text-lg font-semibold text-dark mb-4 ml-10">
              Artikel lain
            </h3>
            <div className="grid grid-cols-1 gap-4 w-full">
              {relatedArticles.map((item) => (
                <div
                  key={item.id}
                  className="transform scale-90 origin-top-right transition-transform duration-200 w-full"
                >
                  <ArtikelCard
                    image={item.image}
                    category={item.category}
                    title={item.title}
                    author={item.author}
                    displayDate={formatSidebarDate(item.date)}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default DetailArtikelPage;
