import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId:  '6w46ted4',
  dataset:  'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token:'skr3Gb5Y4vYjvYlYwsqtUej5wkLExiVskrbJTcqOCde3ces51fymvMCHXkKYBFeGDOhxF9UQtrvlOaJ6DvTZFg5eFVHnOOCSzjZ6K02dmL9eeqRL5KwbPtq1D10qhAkcocXtauNpBpy0hpf97jV0KNtnEM9Q124KWXPSWfpzsWiYCrcEzjyr'
});

// Image URL builder for optimized images
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
