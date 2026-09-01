import ArticleCard from '@/components/article-card';
import { cn, getPageData, JsonApiClient } from 'drupal-canvas';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import useSWR from 'swr';

const client = new JsonApiClient();

const columns = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const formatDate = (iso) => {
  if (!iso) {
    return '';
  }
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
};

const RelatedArticles = ({
  title = 'More like this',
  entityType = 'node--article',
  imageField = 'field_image',
  itemCount = 3,
  columnCount = 3,
  className,
}) => {
  const currentUuid = getPageData()?.entity?.uuid;

  const params = new DrupalJsonApiParams()
    .addInclude([imageField, 'uid'])
    .addSort('created', 'DESC')
    .addPageLimit(itemCount);

  if (currentUuid) {
    params.addFilter('id', currentUuid, '<>');
  }

  const { data, isLoading } = useSWR(
    [entityType, { queryString: params.getQueryString() }],
    ([type, options]) => client.getCollection(type, options),
  );

  const articles = Array.isArray(data) ? data : [];

  if (!isLoading && articles.length === 0) {
    return null;
  }

  return (
    <section className={cn('w-full py-12', className)}>
      <div className="mx-auto max-w-7xl px-6">
        {title && (
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        )}
        <div className={cn('grid grid-cols-1 gap-8', columns[columnCount])}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              url={
                article.path?.alias || `/node/${article.drupal_internal__nid}`
              }
              image={
                article[imageField]?.uri?.url
                  ? {
                      src: article[imageField].uri.url,
                      alt: article[imageField].resourceIdObjMeta?.alt || '',
                    }
                  : undefined
              }
              date={formatDate(article.created)}
              author={article.uid?.display_name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
