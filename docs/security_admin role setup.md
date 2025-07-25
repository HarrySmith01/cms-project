#Elevated Middleware Setup Instructions

This document explains how to configure and use the elevated authentication middleware (elevatedMiddleware) for your /api/meta/\* endpoints.

1. Assign the security_admin Role

Grant elevated access by creating a role named exactly security_admin and assigning it to users:

Here’s the **Admin-UI** workflow to create the **Allowed IP for Security Admin Role** system property—no SQL needed:

---

#### Adding “Allowed IP for Security Admin Role” via the Admin Panel

1. **Log in as an administrator**
   Use a user with the built-in `security_admin` role.

2. **Navigate to System Properties**

   - In the left-hand menu, under **System Definition**, click **Properties**.
   - If you don’t see “Properties,” search for **sys_properties.list** in the application navigator.

3. **Create a new property**

   - Click **New** (top-right).
   - In the **Name** field enter:

     ```
     Allowed IP for Security Admin Role
     ```

   - In **Type** select **String**.
   - In **Value** enter your comma-separated IP addresses, e.g.:

     ```
     192.168.1.0/24,203.0.113.5
     ```

   - In **Description**, add something like:

     > “List of CIDR or individual IPs permitted for users with the security_admin role.”

   - Leave **Advanced** unchecked (unless you want only very senior admins to edit it).
   - Click **Submit**.

4. **Verify property precedence**

   - If a property record exists, its Value will be used—even if you’ve also set `IP_WHITELIST` in `.env`.
   - To fall back to `.env`, simply delete or disable this property record.

5. **Test it out**

   - Restart your app so the middleware re-loads metadata.
   - From an allowed IP and with a `security_admin` user, call any `/api/meta/...` endpoint → you should get **200**.
   - From a disallowed IP (or a non-`security_admin` user) → you should get **403**.
