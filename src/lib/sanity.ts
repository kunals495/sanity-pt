import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId:  '6w46ted4',
  dataset:  'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Image URL builder for optimized images
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
