import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplace {
  [key: string]: string;
}

export const getHtmlContent = (html: string, replaces: ContentReplace = {}) => {
  Object.entries(replaces).forEach(([key, value]) => {
    const key1 = `{{${key}}}`;
    const key2 = `{{${key}}}`;

    html = html.replace(key1, value).replace(key2, value);
  });

  const { window } = new JSDOM();
  return htmlToPdfmake(html, { window });
};
