// utils/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";


// export async function refreshTokenHandler(token) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/refresh/me`, {
//       method: "POST",
//       headers: {
//         Authorization: `Refresh ${token.refreshToken}`,
//       },
//     });

//     console.log({res})

//     if (res.status === 401) {
//       await signOut({ redirect: false, callbackUrl: "/login?signup=sd" });
//       return null;
//     }

//     const data = await res.json();

//     if (data?.status === 200) {
//       return {
//         ...token,
//         accessToken: data.accessToken,
//         refreshToken: data.refreshToken,
//         expiresAt: Date.now() + data.expiresIn * 1000,
//       };
//     }

//     await signOut({ redirect: false, callbackUrl: "/login" });
//     return null;
//   } catch (error) {
//     console.error("❌ Refresh error:", error);
//     await signOut({ redirect: false, callbackUrl: "/login" });
//     return null;
//   }
// }

export const authOptions = {
  providers: [
    // 🔑 SuperAdmin login
    CredentialsProvider({
      id: "superadmin-login",
      name: "SuperAdmin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 SuperAdmin login attempt:", credentials);

          const res = await fetch(
            `${API_BASE_URL}/superadmin/users/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const user = await res.json();
          console.log("✅ SuperAdmin login response:", user);

          if (user?._id && user?.status === 200) {
            return {
              ...user,
              role: "superadmin",
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              expiresAt: Date.now() + user.expiresIn * 1000,
            };
          }
          return null;
        } catch (err) {
          console.error("❌ SuperAdmin error:", err);
          return null;
        }
      },
    }),

    // 🔑 StoreAdmin login
    CredentialsProvider({
      id: "storeAdmin-login",
      name: "StoreAdmin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 StoreAdmin login attempt:", credentials);

          const res = await fetch(
            `${API_BASE_URL}/superadmin/staffs/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const user = await res.json();
          console.log("✅ StoreAdmin login response:", user);

          if (user?._id && user?.status === 200) {
            return {
              ...user,
              role: "storeAdmin",
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              expiresAt: Date.now() + user.expiresIn * 1000,
            };
          }
          return null;
        } catch (err) {
          console.error("❌ StoreAdmin error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) return user;

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (Date.now() < (token.expiresAt)) {
        return token;
      }

      return redirect('/');
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth } = NextAuth(authOptions);
