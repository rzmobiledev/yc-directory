import SearchForm from "@/components/SearchForm";
import StartupCard, { StartUpTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import { auth } from "@/auth"

type Params = {
    searchParams: Promise<{query?: string}>
}

export default async function Home({searchParams}: Params) {

    const query = (await searchParams).query
    const params = { search: query || null}
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params})
    const session = await auth()
    console.log(session?.id)
    return (
      <>
          <section className="pink_container">
                <h1 className="heading">Pitch Your Startup<br/> Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
                </p>

              <SearchForm query={query} />
          </section>

          <section className="section_container">
              <p className="text-30-semibold">
                  { query ? `Search results for "${query}"` : 'All Startups'}
              </p>

              <ul className="mt-7 card_grid">
                  { posts?.length > 0 ? (
                      posts.map((post: StartUpTypeCard) => (
                          <StartupCard key={post?._id} post={post}/>
                      ))
                  ) : (<p className="no-results">Not startups found</p>) }
              </ul>
          </section>

          <SanityLive/>
      </>
    );
}
