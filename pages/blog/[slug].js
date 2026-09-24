import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Widths Next's built-in image optimizer will accept, per next.config.mjs
// (images.deviceSizes + images.imageSizes combined).
const NEXT_IMAGE_WIDTHS = [16, 32, 48, 64, 96, 320, 420, 768, 1024, 1200, 1600, 1920];

function pickImageWidth(target) {
  return NEXT_IMAGE_WIDTHS.find(w => w >= target) || NEXT_IMAGE_WIDTHS[NEXT_IMAGE_WIDTHS.length - 1];
}

const BlogPost = ({ post, relatedPosts, relatedHeading, categories, error }) => {
  const router = useRouter();
  const [activeHeading, setActiveHeading] = useState(null);

  if (router.isFallback) {
    return <div className="container py-5">Loading...</div>;
  }
  if (!post) return <p>Post not found</p>;

  // const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}blog/${post.slug}/`;
  const canonicalUrl = post?.slug
  ? `${process.env.NEXT_PUBLIC_SITE_URL}blog/${post.slug}/`
  : `${process.env.NEXT_PUBLIC_SITE_URL}blog/`;

  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_BLOG_API_Image.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  // Build modified content with injected h2 IDs and construct TOC using custom ID format (tb-XX)
 const { modifiedContent, tableOfContents } = useMemo(() => {
  let toc = [];
  let count = 0;

  const contentWithIds = (post.content || '').replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
    count++;
    const id = `tb-${count.toString().padStart(2, '0')}`;

    const cleanText = p1
      .replace(/<[^>]+>/g, '')   // remove HTML
      .replace(/^\d+\.\s*/, ''); // ✅ remove "1. "

    toc.push({ id, title: cleanText });

    return `<h2 id="${id}">${p1}</h2>`;
  });

  // Route <img> tags in the CMS content through Next's built-in image
  // optimizer as a plain string rewrite (not html-react-parser), since this
  // HTML is injected via dangerouslySetInnerHTML further down. Reparsing it
  // into React elements instead produced a server/client hydration mismatch
  // on messy CMS markup - this way there is nothing for React to hydrate.
  const contentWithImages = contentWithIds.replace(/<img\b([^>]*)>/gi, (match, attrsStr) => {
    const getAttr = (name) => {
      const m = attrsStr.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
      return m ? m[1] : null;
    };

    const src = getAttr('src');
    if (!src) return match;

    const alt = (getAttr('alt') || '').replace(/"/g, '&quot;');
    const width = parseInt(getAttr('width'), 10) || null;
    const height = parseInt(getAttr('height'), 10) || null;
    const absoluteSrc = getImageUrl(src);
    const targetWidth = pickImageWidth(width || 800);
    const optimizedSrc = `/_next/image?url=${encodeURIComponent(absoluteSrc)}&w=${targetWidth}&q=75`;
    const dims = width && height ? ` width="${width}" height="${height}"` : '';

    return `<img src="${optimizedSrc}" alt="${alt}"${dims} loading="lazy" decoding="async" style="max-width:100%;height:auto;" />`;
  });

  return { modifiedContent: contentWithImages, tableOfContents: toc };
}, [post.content]);

  // Use IntersectionObserver to update the active heading in TOC
  useEffect(() => {
    const headings = document.querySelectorAll('h2[id^="tb-"]');
    if (!headings.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, { rootMargin: '0px 0px -80% 0px' });
    headings.forEach(heading => observer.observe(heading));
    return () => {
      headings.forEach(heading => observer.unobserve(heading));
    };
  }, [modifiedContent]);


  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {post.metaKeywords && <meta name="keywords" content={post.metaKeywords} />}
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt || ''} />
        <meta
          property="og:image"
          content={
            post.metaimage
              ? getImageUrl(post.banner)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/banner/home-main-banner.png`
          }
        />
        {post.schema &&
          post.schema.map((scriptContent, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: scriptContent }}
            />
          ))}
      </Head>




      <section className='bg--bb'>
        <div className="container crm-blog-head">
          {/* Breadcrumb */}
          <div className="breadcrumb-list">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><a href="/blog">Blog</a></li>
              <li className="breadcrumb-item active" aria-current="page">{post.readtimes || ' '} min reading in  — {post.category && post.category.slug ? (
                <Link href={`/blog/category/${post.category.slug}`}><span>{post.category.title}</span></Link>
              ) : (
                "Uncategorized"
              )}</li>
            </ol>
          </div>
          <div className="row">
            {/* Main Content (8 columns) */}
            <div className="col-lg-8">
              <div className='main-section p-30'>
                {/* Post Header */}
                <div className='blog-head'>
                  <h1>{post.title}</h1>
                  <div className='combo-sect'>
                    <div className="d-flex blog-author">
                      <span>
                        By <Link href={`/blog/author/${post.author?.slug || post.author?._id || ''}`}>{post.author?.name || 'Unknown'}</Link>
                      </span>
                      <span className="mx-2">|</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="mb-3 post-sharing">
                      <span>Share:</span>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-icon share-facebook"
                        aria-label="Share on Facebook"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-icon share-twitter"
                        aria-label="Share on Twitter"
                      >
                        <i className="bi bi-twitter-x"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-icon share-linkedin"
                        aria-label="Share on LinkedIn"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {post.banner && (
                  <div className='post-feture-image'>
                    <Image
                      src={getImageUrl(post.banner)}
                      alt={post.title}
                      width={800}
                      height={400}
                      priority // Ensures faster loading for LCP
                      quality={75} // Reduce image size
                      loading="eager" // Load immediately
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
                <div
                  className="mt-3 post-content-main"
                  dangerouslySetInnerHTML={{ __html: modifiedContent }}
                  suppressHydrationWarning={true}
                />
                {/* Author Profile Card */}
                <div className="card card-avt my-5">
                  <div className="card-body">
                    <Link href={`/blog/author/${post.author?.slug || post.author?._id || ''}`}>
                      <Image
                        src={post.author?.profilePic ? getImageUrl(post.author.profilePic) : '/img/icons/user-avt.png'}
                        alt={post.author?.name || 'Unknown'}
                        className="rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        width={60}
                        height={60}
                      />
                      <div className='card-avt-det'>
                        <h4>{post.author?.name || 'Unknown'}</h4>
                        <p>{post.author?.aboutus || ''}</p>

                      </div>
                    </Link>

                  </div>
                </div>
                {/* Related Posts Section */}

              </div>
            </div>
            {/* Sidebar (4 columns): Table of Contents & Categories */}
            <div className="col-lg-4">
              <div className='po-sticky'>
                <div className="sidebars">
                  {tableOfContents.length >= 2 && (
                    <>
                      <h3>Table of Contents</h3>
                      <ol className="list-group-tb mb-4">
                        {tableOfContents.map(item => (
                          <li key={item.id} className={` ${activeHeading === item.id ? 'active' : ''}`}>
                            <a
                              href={`#${item.id}`}
                              onClick={e => {
                                e.preventDefault();
                                const element = document.getElementById(item.id);
                                if (element) {
                                  const yOffset = -250; // adjust offset value as needed
                                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }}
                            >{item.title}</a>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                  <h3>Categories</h3>
                  {categories && categories.length > 0 ? (
                    <ul className="list-group-tba">
                      {categories.map(cat => (
                        <li key={cat._id} className="list-group-cu">
                          <Link href={`/blog/category/${cat.slug || cat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            {cat.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No categories available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className='relted-head'>{relatedHeading}</h3>
            </div>
            {relatedPosts && relatedPosts.length > 0 ? (
              relatedPosts.map(rp => (
                <div key={rp.slug} className="col-lg-4 mb-4">
                  <div className='card-blog-home'>
                    <Link href={`/blog/${rp.slug}`} className='card-blog-home-img'>
                      <Image
                        src={rp.banner ? getImageUrl(rp.banner) : '/img/sdie-pop.png'}
                        alt={rp.title}
                        width={400}
                        height={240}
                        className='img-fluid'
                      />
                    </Link>
                    <div className='card-blog-home-body'>
                      <Link href={`/blog/${rp.slug}`}>
                        <h3>{rp.title}</h3>
                      </Link>
                      <div className='card-blog-home-meta'>
                        <Link href={`/blog/author/${rp.author?.slug || rp.author?._id || ''}`}>
                          <Image
                            width={40}
                            height={40}
                            src={rp.author?.profilePic ? getImageUrl(rp.author.profilePic) : '/img/icons/user-avt.png'}
                            alt="user avatar"
                          />
                        </Link>
                        <div className='av-info'>
                          <div className='av-name-a'>{rp.author?.name || 'Unknown'}</div>
                          <div className='av-date-b'>{formatDate(rp.createdAt)} <span>|</span> {rp.readtimes || ''}min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No related posts found. Check out some random posts instead.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticPaths() {
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  try {
    const res = await fetch(blogApi);
    const posts = await res.json();
    const paths = posts.map(post => ({
      params: { slug: post.slug }
    }));
     // fallback: 'blocking' ensures page waits for data before rendering (better SEO)
    return { paths, fallback: 'blocking' };
  } catch (err) {
    console.error(err);
    return { paths: [], fallback: 'blocking' };
  }
}

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
//   const categoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;
//   try {
//     const postRes = await fetch(`${blogApi}/${slug}`);
//     if (!postRes.ok) throw new Error('Failed to fetch post');
//     const post = await postRes.json();

//     const allRes = await fetch(blogApi);
//     let allPosts = [];
//     if (allRes.ok) {
//       allPosts = await allRes.json();
//     }
//     const sameCategoryPosts = allPosts.filter(
//       p => p.category._id === post.category._id && p._id !== post._id
//     );
//     let relatedPosts = [];
//     let relatedHeading = '';
//     if (sameCategoryPosts.length > 0) {
//       relatedHeading = 'Related Posts';
//       relatedPosts = sameCategoryPosts.slice(0, 3);
//     } else {
//       relatedHeading = 'Random Posts';
//       const randomPosts = allPosts.filter(p => p._id !== post._id);
//       relatedPosts = randomPosts.slice(0, 3);
//     }

//     const catRes = await fetch(categoryApi);
//     let categories = [];
//     if (catRes.ok) {
//       categories = await catRes.json();
//     }

//     return { props: { post, relatedPosts, relatedHeading, categories }, revalidate: 60 };
//   } catch (err) {
//     console.error(err);
//     return { props: { post: null, error: true, relatedPosts: [], categories: [] }, revalidate: 60 };
//   }
// }

// export default BlogPost;
export async function getStaticProps({ params }) {
  const { slug } = params;
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  const categoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  try {
    // Fetch the post by slug, retrying with backoff in case a just-published
    // post hasn't propagated on the backend yet
    const retryDelays = [1000, 2000, 4000];
    let postRes = await fetch(`${blogApi}/${slug}`);
    for (const delay of retryDelays) {
      if (postRes.ok) break;
      await new Promise((resolve) => setTimeout(resolve, delay));
      postRes = await fetch(`${blogApi}/${slug}`);
    }
    if (!postRes.ok) {
      // Short revalidate so a wrongly-cached 404 self-heals quickly
      // once the backend actually has the post, instead of sticking
      // around for a full minute.
      return { notFound: true, revalidate: 5 };
    }
    const post = await postRes.json();
    if (!post || Object.keys(post).length === 0) {
      return { notFound: true, revalidate: 5 };
    }

    // Fetch all posts
    const allRes = await fetch(blogApi);
    let allPosts = [];
    if (allRes.ok) {
      allPosts = await allRes.json();
    }

    // Determine related posts
    const sameCategoryPosts = allPosts.filter(
      p => p.category?._id === post.category?._id && p._id !== post._id
    );
    let relatedPosts = [];
    let relatedHeading = '';
    if (sameCategoryPosts.length > 0) {
      relatedHeading = 'Related Posts';
      relatedPosts = sameCategoryPosts.slice(0, 3);
    } else {
      relatedHeading = 'Random Posts';
      relatedPosts = allPosts.filter(p => p._id !== post._id).slice(0, 3);
    }

    // Fetch categories
    const catRes = await fetch(categoryApi);
    let categories = [];
    if (catRes.ok) {
      categories = await catRes.json();
    }

    return {
      props: { post, relatedPosts, relatedHeading, categories },
      revalidate: 60
    };
  } catch (err) {
    console.error(err);
    return { notFound: true, revalidate: 5 }; // Return 404 if there’s an error
  }
}

export default BlogPost;
