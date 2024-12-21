import {STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import StartupCard, {StartUpTypeCard} from "@/components/StartupCard";
import {client} from "@/sanity/lib/client";


const UserStartups = async({id}: {id: string}) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
    return (
        <>
            { startups.length > 0 ? startups.map((startup: StartUpTypeCard) => (
                <StartupCard key={startup._id} post={startup} />
            )) : <p className="no-result">No posts yet</p>}
        </>
    );
};

export default UserStartups;