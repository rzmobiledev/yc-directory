import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";

type User = {
    name: string
    email: string
    image: string
}

type Profile = {
    id: string
    login: string
    bio: string
}

type JWT = {
    token: {id: string}
    account: object
    profile: { id: string}

}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
            user: {name, email, image}, profile,
        }: {user: User, profile: Profile}){
            const existingUser = await client.withConfig({ useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                id: profile?.id
            })
            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name,
                    username: profile?.login,
                    email,
                    image,
                    bio: profile?.bio || ''
                })
            }
            return true
        },
        async jwt({token, account, profile}: JWT){
            if(account && profile){
                const user = await client.withConfig({ useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id: profile?.id
                })

                token.id = user?._id
            }
            return token
        },

        async session({session, token}: {session: never, token: {id: string}}){
            Object.assign(session, { id: token.id})
            return session
        }
    }
})