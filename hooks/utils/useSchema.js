const parseTime = time => {
  if (time.length !== 5) {
    return '';
  }
  const hours = time.split(':')[0].length === 2 ? time.split(':')[0] : '00';
  const minutes = time.split(':')[1].length === 2 ? time.split(':')[1] : '00';
  return `PT${hours}H${minutes}M`;
};

export const useSchema = (mode, data) => {
  switch (mode) {
    case 'product':
      return {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: data.productName ? data.productName : '',
        image: data.image ? data.image : '',
        description: data.description ? data.description : '',
        sku: data.sku ? data.sku : '',
        brand: data.brand
          ? {
              '@type': 'Thing',
              name: data.brand,
            }
          : '',
        review: data.reviews.map(
          ({ ContributorName, RatedOn, ReviewTitle, ReviewComment, Rating }) => ({
            author: ContributorName === 'anonymous_user' || !ContributorName ? '' : ContributorName,
            datePublished: RatedOn || '',
            reviewBody: ReviewComment || '',
            name: ReviewTitle || '',
            reviewRating: {
              bestRating: '5',
              ratingValue: Rating || '3',
              worstRating: '1',
            },
          })
        ),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: data.aggregateRating.value ? data.aggregateRating.value : '',
          reviewCount: data.aggregateRating.count ? data.aggregateRating.count : '',
        },
        offers: {
          '@type': 'Offer',
          price: data.price ? data.price : '',
          priceCurrency: 'GBP',
          priceValidUntil: new Date().getFullYear() + 1, // not sure, sorry if you read this
          itemCondition: 'new',
          availability: 'InStock',
          url: data.url ? data.url : '',
          seller: {
            name: 'Pukka',
          },
        },
      };
    case 'website':
      return {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: data.siteName ? data.siteName : '',
        url: data.url ? data.url : '',
        sameAs: data.sameAs ? data.sameAs.map(sameAs => sameAs) : '',
      };
    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((bc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': bc.url,
            name: bc.name,
          },
        })),
      };
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title ? data.title : '',
        alternativeHeadline: data.subtitle ? data.subtitle : '',
        image: data.image ? data.image : '',
        author: data.author ? data.author : '',
        award: data.award ? data.award : '',
        genre: data.genre ? data.genre : '',
        publisher: {
          '@type': 'Organization',
          name: 'Pukka',
        },
        url: data.url ? data.url : '',
        datePublished: data.date,
        dateCreated: data.date,
        dateModified: data.date,
        description: data.description ? data.description : '',
        articleBody: data.content ? data.content : '',
      };
    case 'videoObject':
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: data.title ? data.title : '',
        description: data.description ? data.descriptiuon : '',
        thumbnailUrl: data.thumbnail ? data.thumbnail : '',
        uploadDate: '2015-04-05T08:00:00+02:00',
        duration: 'PT1M33S',
        contentUrl: data.url ? data.url : '',
        interactionCount: '2347',
      };
    case 'recipe':
      return {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        name: data.title ? data.title : '',
        image: data.images ? data.images.map(link => link) : '',
        author: {
          '@type': 'Person',
          name: 'Pukka',
        },
        datePublished: data.date ? data.date : '',
        description: data.description ? data.description : '',
        prepTime: data.prepTime ? parseTime(data.prepTime) : '',
        cookTime: data.cookTime ? parseTime(data.cookTime) : '',
        totalTime: data.totalTime ? parseTime(data.totalTime) : '',
        keywords: data.keyWords ? data.keywords : '',
        recipeYield: data.numberOfServing ? `${data.numberOfServing}` : '',
        recipeCategory: data.recipeCategory ? data.recipeCategory : '',
        recipeCuisine: data.recipeOrigin ? data.recipeOrigin : '',
        nutrition: {
          '@type': 'NutritionInformation',
          calories: data.calories ? data.calories : '',
        },
        recipeIngredient: data.ingredients ? data.ingredients.map(ing => ing) : '',
        recipeInstructions: data.instructions
          ? data.instructions.map(({ step, url, img }) => ({
              '@type': 'HowToStep',
              name: step || '',
              text: step || '',
              url: url || '',
              image: img || '',
            }))
          : '',
      };
    default:
      return null;
  }
};

export default useSchema;
