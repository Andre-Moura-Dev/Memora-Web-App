// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import Logo from "@/assets/logoMemora.png";

type Publication = {
  id_publicacoes: number;
  titulo: string;
  conteudo: string | null;
  categoria: string;
  status: string;
  data_publicacao: string;
  autor_nome?: string;
};

export default function PublicHomePage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Buscar publicações públicas (status = "Publicado")
  useEffect(() => {
    async function fetchPublications() {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/api/public/publications`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          console.error("Erro ao buscar publicações:", await res.text());
          setLoading(false);
          return;
        }

        const data: Publication[] = await res.json();
        const onlyPublished = data.filter(
          (pub) => pub.status === "Publicado"
        );

        setPublications(onlyPublished);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Erro ao conectar com o servidor:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublications();
  }, []);

  // Trocar publicação a cada 5 segundos (carrossel hero)
  useEffect(() => {
    if (publications.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= publications.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [publications]);

  const hasCarousel = publications.length > 0;
  const currentPub = hasCarousel ? publications[currentIndex] : null;

  // helper para tirar texto do HTML
  function getSnippet(html?: string | null) {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    if (text.length <= 220) return text;
    return text.slice(0, 220) + "...";
  }

  // pega a primeira <img> do HTML do conteúdo
  function getFirstImage(html?: string | null) {
    if (!html) return null;

    const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    return match ? match[1] : null;
  }


  // primeiro 3 posts para a seção de "Histórias"
  const topStories = publications.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Image src={Logo} alt="Memora" width={160} height={64} />
          </div>
          <nav className={styles.nav}>
            <Link href="#" className={styles.navItemActive}>
              Home
            </Link>
            <Link href="#" className={styles.navItem}>
              Empresa
            </Link>
            <Link href="#" className={styles.navItem}>
              Clientes
            </Link>
            <Link href="#" className={styles.navItem}>
              Soluções
            </Link>
            <Link href="#" className={styles.navItem}>
              Histórias Memoráveis
            </Link>
            <Link href="#" className={styles.navItem}>
              Alianças
            </Link>
            <Link href="#" className={styles.navItem}>
              Trabalhe Conosco
            </Link>
            <Link href="#" className={styles.navItem}>
              Blog
            </Link>
            <Link href="#" className={styles.navItem}>
              Contatos
            </Link>
            <Link href="#" className={styles.navItem}>
              Na mídia
            </Link>
          </nav>
          <div className={styles.headerRight}>
            <Link href="/login" className={styles.loginButtonOutline}>
              Login administrador
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.main}>
        {/* HERO + CARROSSEL */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Transformando processos em <span>resultados memoráveis</span>.
            </h1>
            <p className={styles.heroSubtitle}>
              Tecnologia, metodologia e pessoas trabalhando juntas para gerar
              impacto real em governos e organizações.
            </p>

            <div className={styles.heroActions}>
              <Link href="#historias" className={styles.primaryCta}>
                Ver histórias de sucesso
              </Link>
              <Link href="/login" className={styles.secondaryCta}>
                Acessar área administrativa
              </Link>
            </div>

            {!loading && !hasCarousel && (
              <p className={styles.noNews}>
                Nenhuma notícia publicada ainda. Em breve teremos novidades!
              </p>
            )}
          </div>

          {/* CARROSSEL DE NOTÍCIAS EM DESTAQUE */}
          <div className={styles.heroRight}>
            {loading && (
              <p className={styles.loading}>Carregando notícias...</p>
            )}

            {!loading && hasCarousel && currentPub && (
              <Link
                href={`/publicacoes/${currentPub.id_publicacoes}`}
                className={styles.carouselLinkWrapper}
              >
                <article className={styles.carousel}>
                  <div className={styles.carouselHeader}>
                    <span className={styles.carouselBadge}>Em destaque</span>
                    <div className={styles.carouselDots}>
                      {publications.map((_, i) => (
                        <span
                          key={i}
                          className={
                            i === currentIndex
                              ? styles.carouselDotActive
                              : styles.carouselDot
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* IMAGEM DO CARROSSEL */}
                  <div className={styles.carouselImageWrapper}>
                    {(() => {
                      const imgUrl = getFirstImage(currentPub.conteudo);
                      if (!imgUrl) {
                        return (
                          <div className={styles.carouselImagePlaceholder}>
                            <span>Imagem</span>
                          </div>
                        );
                      }

                      return (
                        <img
                          src={imgUrl}
                          alt={currentPub.titulo}
                          className={styles.carouselImage}
                        />
                      );
                    })()}
                  </div>

                  {/* TEXTO / META */}
                  <h2 className={styles.carouselTitle}>{currentPub.titulo}</h2>

                  <p className={styles.carouselMeta}>
                    {currentPub.categoria} •{" "}
                    {new Date(
                      currentPub.data_publicacao
                    ).toLocaleDateString("pt-BR")}
                    {currentPub.autor_nome && ` • ${currentPub.autor_nome}`}
                  </p>

                  <p className={styles.carouselSnippet}>
                    {getSnippet(currentPub.conteudo)}
                  </p>

                  <div className={styles.carouselFooter}>
                    <span className={styles.carouselReadMore}>Ler matéria</span>

                    <div className={styles.carouselArrows}>
                      <button
                        type="button"
                        className={styles.carouselButton}
                        onClick={(e) => {
                          e.preventDefault(); // não navegar ao clicar na seta
                          setCurrentIndex((prev) =>
                            prev - 1 < 0 ? publications.length - 1 : prev - 1
                          );
                        }}
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        className={styles.carouselButton}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentIndex((prev) =>
                            prev + 1 >= publications.length ? 0 : prev + 1
                          );
                        }}
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            )}
          </div>
        </section>

        {/* NOSSOS RESULTADOS */}
        <section className={styles.resultsSection}>
          <div className={styles.resultsLeft}>
            <p className={styles.resultsLabel}>Nossos</p>
            <h2 className={styles.resultsTitle}>Resultados</h2>
            <p className={styles.resultsText}>
              Nossos clientes são nossos parceiros e proporcionar uma
              experiência fantástica é a nossa missão. Confira alguns dos
              resultados alcançados ao longo da nossa jornada:
            </p>
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultItem}>
              <div className={styles.resultIcon}>👥</div>
              <p className={styles.resultNumber}>+ 500</p>
              <p className={styles.resultLabel}>colaboradores</p>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultIcon}>🏢</div>
              <p className={styles.resultNumber}>6</p>
              <p className={styles.resultLabel}>
                escritórios no Brasil <br /> e um na Europa
              </p>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultIcon}>📈</div>
              <p className={styles.resultNumber}>+ de 450</p>
              <p className={styles.resultLabel}>
                casos de sucesso <br /> em transformação digital
              </p>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultIcon}>💰</div>
              <p className={styles.resultNumber}>+ R$ 1,8 bi</p>
              <p className={styles.resultLabel}>
                recuperados relativos <br /> à Dívida Ativa
              </p>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultIcon}>🌎</div>
              <p className={styles.resultNumber}>+ de 50 mi</p>
              <p className={styles.resultLabel}>
                de pessoas impactadas <br /> em todo o país
              </p>
            </div>
          </div>
        </section>

        {/* SOLUÇÕES (grade de cards) */}
        <section className={styles.solutionsSection}>
          <h2 className={styles.sectionTitle}>Soluções que geram valor</h2>

          <div className={styles.solutionsGrid}>
            {[
              {
                title: "Atendimento ao Cidadão",
                text: "Aumente a capacidade de atendimento sem elevar o número de funcionários.",
              },
              {
                title: "Aumento de Arrecadação",
                text: "Tecnologia e inteligência de dados para elevar a arrecadação no setor público.",
              },
              {
                title: "Economia de recursos",
                text: "Eficiência e otimização para gerar mais resultado com menos gasto.",
              },
              {
                title: "Workspace jurídico",
                text: "Estratégia, gestão e automação para departamentos jurídicos modernos.",
              },
              {
                title: "Transformação digital",
                text: "Soluções sob medida para acelerar a transformação digital.",
              },
              {
                title: "Transformação organizacional",
                text: "Estratégias para desenvolver organizações de alta performance.",
              },
            ].map((sol) => (
              <div key={sol.title} className={styles.solutionCard}>
                <div className={styles.solutionIcon}>📌</div>
                <h3 className={styles.solutionTitle}>{sol.title}</h3>
                <p className={styles.solutionText}>{sol.text}</p>
                <button className={styles.solutionButton}>Ver histórias</button>
              </div>
            ))}
          </div>
        </section>

        {/* HISTÓRIAS / BLOG – usando publicações */}
        <section id="historias" className={styles.storiesSection}>
          <h2 className={styles.sectionTitle}>Histórias memoráveis</h2>
          <p className={styles.sectionSubtitle}>
            Conheça alguns cases de sucesso, projetos e iniciativas que estão
            transformando a gestão pública e privada.
          </p>

          {!loading && topStories.length === 0 && (
            <p className={styles.noNewsCenter}>
              Ainda não há histórias publicadas. Volte em breve!
            </p>
          )}

          <div className={styles.storiesGrid}>
            {topStories.map((pub) => {
              const imgUrl = getFirstImage(pub.conteudo);

              return (
                <Link
                  key={pub.id_publicacoes}
                  href={`/publicacoes/${pub.id_publicacoes}`}
                  className={styles.storyLinkWrapper}
                >
                  <article className={styles.storyCard}>
                    <div className={styles.storyImageWrapper}>
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={pub.titulo}
                          className={styles.storyImage}
                        />
                      ) : (
                        <div className={styles.storyImagePlaceholder}>
                          <span>Imagem</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.storyTags}>
                      <span className={styles.storyTag}>
                        {pub.categoria.toUpperCase()}
                      </span>
                    </div>

                    <div className={styles.storyBody}>
                      <h3 className={styles.storyTitle}>{pub.titulo}</h3>
                      <p className={styles.storySnippet}>
                        {getSnippet(pub.conteudo)}
                      </p>

                      <span className={styles.storyLink}>Ler mais</span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SEÇÃO DE LOGIN / CTA ADMIN */}
        <section className={styles.loginSection}>
          <div className={styles.loginCard}>
            <h2>Área administrativa</h2>
            <p>
              Se você é administrador, acesse o painel para cadastrar
              publicações, gerenciar usuários e configurar permissões.
            </p>
            <div className={styles.loginActions}>
              <Link href="/login" className={styles.loginButtonPrimary}>
                Entrar como administrador
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Memora. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
