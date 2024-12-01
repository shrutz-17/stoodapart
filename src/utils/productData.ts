import { Product } from '../types';

// Parse the price to a float (already exists)
export function parsePrice(price: string): number {
  return parseFloat(price.replace('£', '') || '0');
}

// Format the price (already exists)
export function formatPrice(price: string): string {
  return price.startsWith('£') ? price : `£${price}`;
}

// List of products with added colour field
export const products: Product[] = [
  {
    id: 'dp-1',
    name: 'Petite Stretch Denim Knee Shorts',
    brand: 'Dorothy Perkins',
    currentPrice: '£10.00',
    originalPrice: '£20.00',
    discount: 'Save 50%',
    productLink: 'https://www.dorothyperkins.com/product/dorothy-perkins-petite-stretch-denim-knee-shorts_bqq17076?colour=mid%20wash',
    imageUrl: 'https://mediahub.dorothyperkins.com/bqq17076_mid%20wash_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Stretch Denim Knee Shorts mid wash',
    swatchImage1: 'https://mediahub.dorothyperkins.com/bqq17076_mid%20wash_xl_s?qlt=80&w=40&h=40&dpr=1&fit=cvr',
    swatchAlt1: 'mid wash',
    swatchImage2: 'https://mediahub.dorothyperkins.com/bqq17076_light%20wash_xl_s?qlt=80&w=40&h=40&dpr=1&fit=cvr',
    swatchAlt2: 'light wash',
    colour: 'mid wash', // Changed "color" to "colour"
  },
  {
    id: 'dp-2',
    name: 'Petite Mom Fold Back Shorts',
    brand: 'Dorothy Perkins',
    currentPrice: '£13.00',
    originalPrice: '£18.00',
    discount: 'Save 28%',
    productLink: 'https://www.dorothyperkins.com/product/dorothy-perkins-petite-mom-fold-back-shorts_bqq17075?colour=light%20wash',
    imageUrl: 'https://mediahub.dorothyperkins.com/bqq17075_light%20wash_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Mom Fold Back Shorts light wash',
    swatchImage1: 'https://mediahub.dorothyperkins.com/bqq17075_light%20wash_xl_s?qlt=80&w=40&h=40&dpr=1&fit=cvr',
    swatchAlt1: 'light wash',
    swatchImage2: 'https://mediahub.dorothyperkins.com/bqq17075_light%20wash_xl_s?qlt=80&w=40&h=40&dpr=1&fit=cvr',
    swatchAlt2: 'light wash',
    colour: 'light wash', // Changed "color" to "colour"
  },
  {
    id: 'dp-3',
    name: 'Petite Belted Paperbag Waist Shorts',
    brand: 'Dorothy Perkins',
    currentPrice: '£13.00',
    originalPrice: '£25.00',
    discount: 'Save 48%',
    productLink: 'https://www.dorothyperkins.com/product/dorothy-perkins-petite-belted-paperbag-waist-shorts_bqq16576?colour=khaki',
    imageUrl: 'https://mediahub.dorothyperkins.com/bqq16576_khaki_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Belted Paperbag Waist Shorts khaki',
    colour: 'khaki', // Changed "color" to "colour"
  },
  {
    id: 'dp-4',
    name: 'Petite Twill Paperbag Short',
    brand: 'Dorothy Perkins',
    currentPrice: '£10.15',
    originalPrice: '£29.00',
    discount: 'Save 65%',
    productLink: 'https://www.dorothyperkins.com/product/dorothy-perkins-petite-twill-paperbag-short_bqq16562?colour=blue',
    imageUrl: 'https://mediahub.dorothyperkins.com/bqq16562_blue_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Twill Paperbag Short blue',
    colour: 'blue', // Changed "color" to "colour"
  },
  {
    id: 'dp-5',
    name: 'Petite Utility Short',
    brand: 'Dorothy Perkins',
    currentPrice: '£17.40',
    originalPrice: '£29.00',
    discount: 'Save 40%',
    productLink: 'https://www.dorothyperkins.com/product/dorothy-perkins-petite-utility-short_bqq16564?colour=khaki',
    imageUrl: 'https://mediahub.dorothyperkins.com/bqq16564_khaki_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Utility Short khaki',
    colour: 'khaki', // Changed "color" to "colour"
  },
  {
    id: 'oa-1',
    name: 'Petite Velvet Geo Sequin Short',
    brand: 'Oasis',
    currentPrice: '£28.00',
    originalPrice: '£35.00',
    discount: 'Save 20%',
    productLink: 'https://www.dorothyperkins.com/product/oasis-petite-velvet-geo-sequin-short_baa10988?colour=silver',
    imageUrl: 'https://mediahub.dorothyperkins.com/baa10988_silver_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Velvet Geo Sequin Short silver',
    colour: 'silver', // Changed "color" to "colour"
  },
  {
    id: 'oa-2',
    name: 'Petite Embroidered Denim Shorts',
    brand: 'Oasis',
    currentPrice: '£12.00',
    originalPrice: '£45.00',
    discount: 'Save 73%',
    productLink: 'https://www.dorothyperkins.com/product/oasis-petite-embroidered-denim-shorts_baa08995?colour=light%20wash',
    imageUrl: 'https://mediahub.dorothyperkins.com/baa08995_light%20wash_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Embroidered Denim Shorts light wash',
    colour: 'light wash', // Changed "color" to "colour"
  },
  {
    id: 'px-1',
    name: 'Petite Broderie Anglaise Shorts',
    brand: 'PixieGirl',
    currentPrice: '£24.99',
    productLink: 'https://www.dorothyperkins.com/product/pixiegirl-petite-broderie-anglaise-shorts_p-0aeb645a-5fce-412a-a1c4-54e301c1d641?colour=White',
    imageUrl: 'https://mediahub.dorothyperkins.com/m5063111369096_white_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Broderie Anglaise Shorts White',
    colour: 'white', // Changed "color" to "colour"
  },
  {
    id: 'px-2',
    name: 'Petite Broderie Anglaise Shorts',
    brand: 'PixieGirl',
    currentPrice: '£24.99',
    productLink: 'https://www.dorothyperkins.com/product/pixiegirl-petite-broderie-anglaise-shorts_p-76e32961-2f7c-4caa-8443-2ef178250954?colour=Black',
    imageUrl: 'https://mediahub.dorothyperkins.com/m5063111368952_black_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Broderie Anglaise Shorts Black',
    colour: 'black', // Changed "color" to "colour"
  },
  {
    id: 'oa-3',
    name: 'Petite Paperbag Denim Shorts',
    brand: 'Oasis',
    currentPrice: '£8.00',
    originalPrice: '£35.00',
    discount: 'Save 77%',
    productLink: 'https://www.dorothyperkins.com/product/oasis-petite-paperbag-denim-shorts_baa09663?colour=pink',
    imageUrl: 'https://mediahub.dorothyperkins.com/baa09663_pink_xl?qlt=80&w=320&h=480&dpr=1&fit=ctn',
    imageAlt: 'Product Petite Paperbag Denim Shorts pink',
    colour: 'pink', // Changed "color" to "colour"
  }
];
