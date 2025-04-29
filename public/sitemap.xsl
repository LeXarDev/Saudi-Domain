<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>خريطة الموقع - Saudi Domain Checker</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 2rem;
          }
          a {
            color: #3b82f6;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          th {
            background: #f3f4f6;
            padding: 1rem;
            text-align: right;
          }
          td {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
          h1 {
            color: #1f2937;
            margin-bottom: 2rem;
          }
          .meta {
            color: #6b7280;
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <h1>خريطة الموقع</h1>
        <table>
          <tr>
            <th>الرابط</th>
            <th>آخر تحديث</th>
            <th>معدل التغيير</th>
            <th>الأولوية</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <a href="{sitemap:loc}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td class="meta"><xsl:value-of select="sitemap:lastmod"/></td>
              <td class="meta"><xsl:value-of select="sitemap:changefreq"/></td>
              <td class="meta"><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
