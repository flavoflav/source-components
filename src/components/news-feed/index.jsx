import ArticleCard from '@/components/article-card';
import { cn, FormattedText, JsonApiClient } from 'drupal-canvas';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import useSWR from 'swr';

const client = new JsonApiClient();

const columns = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const backgrounds = {
  none: '',
  white: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-900 text-white',
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

const NewsFeed = ({
  title,
  intro,
  entityType = 'node--article',
  imageField = 'field_image',
  summaryField = 'field_summary',
  itemCount = 6,
  columnCount = 3,
  sortField = 'created',
  background = 'none',
  cardVariant = 'plain',
  viewAllLabel,
  viewAllUrl,
  className,
}) => {
  const { data, isLoading, error } = useSWR(
    [
      entityType,
      {
        queryString: new DrupalJsonApiParams()
          .addInclude([imageField, 'uid'])
          .addSort(sortField, 'DESC')
          .addPageLimit(itemCount)
          .getQueryString(),
      },
    ],
    ([type, options]) => client.getCollection(type, options),
  );

  const articles = Array.isArray(data) ? data : [];

  return (
    <section className={cn('w-full py-16', backgrounds[background], className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(title || intro) && (
          <div className="mb-10 flex flex-col gap-3">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <FormattedText className="max-w-2xl text-lg leading-relaxed opacity-80">
                {intro}
              </FormattedText>
            )}
          </div>
        )}

        {isLoading && (
          <div className={cn('grid grid-cols-1 gap-8', columns[columnCount])}>
            {Array.from({ length: Math.min(itemCount, columnCount) }).map(
              (_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/2] w-full rounded-xl bg-current/10" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-current/10" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-current/10" />
                </div>
              ),
            )}
          </div>
        )}

        {!isLoading && articles.length === 0 && (
          <p className="rounded-xl border border-dashed border-current/25 p-10 text-center opacity-60">
            {error
              ? 'Content could not be loaded. Check that the entity type exists and JSON:API is enabled.'
              : `No ${entityType} content found yet.`}
          </p>
        )}

        {articles.length > 0 && (
          <div className={cn('grid grid-cols-1 gap-8', columns[columnCount])}>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                url={
                  article.path?.alias || `/node/${article.drupal_internal__nid}`
                }
                summary={
                  article[summaryField] || article.body?.summary || undefined
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
                variant={cardVariant}
              />
            ))}
          </div>
        )}

        {viewAllLabel && viewAllUrl && (
          <div className="mt-12 flex justify-center">
            <a
              href={viewAllUrl}
              className="rounded-md border border-current/30 px-6 py-3 font-semibold hover:bg-current/5"
            >
              {viewAllLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;
