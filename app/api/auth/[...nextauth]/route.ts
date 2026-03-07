import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "@/lib/db/mock-data"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        // Match against mock data for now
        const user = users.find(u => u.email === credentials.email)
        
        // In a real app, you would verify the password hash here
        // For the demo/mock, we accept "1234"
        if (user && credentials.password === "1234") {
          return {
            id: user.id_user.toString(),
            name: user.role,
            email: user.email,
            role: user.role,
            emp_id: user.emp_id
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = user.role
        token.emp_id = user.emp_id
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        session.user.role = token.role
        session.user.emp_id = token.emp_id
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "dummy-secret-for-now"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
