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

        if (!adminEmail || !adminPasswordHash) {
          console.error("[auth] Admin auth configuration missing", {
            adminEmailConfigured: Boolean(adminEmail),
            adminPasswordHashConfigured: Boolean(adminPasswordHash),
          });
          return null;
        }

        if (email !== adminEmail) {
          console.warn("[auth] Admin sign-in rejected: ADMIN_EMAIL mismatch");
          return null;
        }

        let valid: boolean;
        try {
          valid = await bcrypt.compare(password, adminPasswordHash);
        } catch {
          console.error("[auth] ADMIN_PASSWORD_HASH is invalid");
          return null;
        }
        if (!valid) {
          console.warn("[auth] Admin sign-in rejected: password does not match configured hash");
          return null;
        }

        return { id: "1", email, name: "André Kim" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  trustHost: true,
});
