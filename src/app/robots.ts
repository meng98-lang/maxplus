import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.COZE_PROJECT_DOMAIN_DEFAULT ? `https://${process.env.COZE_PROJECT_DOMAIN_DEFAULT}` : 'https://chuanjing-max.com';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }, { userAgent: 'Googlebot', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.COZE_PROJECT_DOMAIN_DEFAULT ? `https://${process.env.COZE_PROJECT_DOMAIN_DEFAULT}` : 'https://chuanjing-max.com';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }, { userAgent: 'Googlebot', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
