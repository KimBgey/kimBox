import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.trim() ?? "";
        const password = (credentials?.password as string | undefined) ?? "";

        if (!email || !password) return null;

        const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim();
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH ?? "";

        if (!adminPasswordHash || email !== adminEmail) return null;

        const valid = await bcrypt.compare(password, adminPasswordHash);
        if (!valid) return null;

        return { id: "1", email, name: "André Kim" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  trustHost: true,
});
