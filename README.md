# Shared TodoList with Stytch Auth

## Summary

This is a simple shared todo list app that uses Stytch for authentication. It is based on the [Stytch Next.js Page Router example application](https://github.com/stytchauth/stytch-nextjs-example).

It is built to showcase the ease of using `trusted_metadata` to create a multi-tenant application with dynamic groups. This allows for a multi-tenant application to scale to any number of users and groups without incurring additional costs or requiring additional management of the groups.

In this version of the application a user is created with an assigned group in the database seed of data. Once a user is in a group they can create and manage their own todo lists as well as view and manage the todo lists of other users in their group. Each user in a group will see the same todo lists.

_In a fully working application, users would be able to create/update/delete todos and invite other users to join their group, but time was a limitation in this implementation, choosing to focus only on the relevant feature for this challenge._

## Technical details

- This application offers a multi-tenant based TodoList allowing users to create and manage their own todo lists as well as share them with other users in their group.

- Groups are dynamic and are stored in `trusted_metatdata` in the Stytch user object. This allows for dynamic groups to be created and managed by the users themselves and can scale to any number of users.

## Why use **dynamic groups** vs Stytch Organizations?

Organizations are a great way to manage groups of users and allow for a single user to be a member of multiple organizations. However, organizations are not dynamic and require a user to be added to an organization by an admin. This is not ideal for a multi-tenant application where users should be able to create and manage their own groups.

Furthermore organizations are not scalable -- from a developer's perspective -- for a multi-tenant application due to cost/service plan limitations and the need to provision and manage an organization when the plans limit the scale of organizations compare to cost. This means that a project can only support X users at a cost that is perceived as not feasible and is not ideal for a multi-tenant application where the number of users is unknown and can grow to any number.

Instead, leveraging `trusted_metadata` (in this example) or `custom_claims` securely set and present in the JWT or persisted to the session and accessible via server/client interfaces, developers can set a dynamic group (or groups). often managed in another database, and allow users to be a member of multiple groups. This allows for a multi-tenant application to scale to any number of users and groups without incurring additional costs or requiring additional management of the groups.

## Set up

1. Follow the steps of the base application to get credentials for a Stytch project to set up the application.

2. Update the `.env.local` file with the credentials from the Stytch project.

3. Run `npm install` to install the dependencies.

4. Run `npm run provisionUsers` to provision the users for the application into the Stytch project.

5. Run `npm run dev` to start the application.

6. Run the Cypress tests with `npm run test` to run the tests to explore the application scenarios.

7. Navigate to `http://localhost:3000` to view the application and login various Stytch users located in the `cypress/fixtures/users.json` file with a password of `!qlIb08ue9Ljabfd` to view the application from the perspective of various users.

## Base application

<details>
  <summary><h1>Stytch Next.js Page Router example application</h1></summary>

<p align="center">
  <img src="https://user-images.githubusercontent.com/100632220/217049841-b9eeb72a-3e50-4074-839a-e64ee5d4a88c.png" width="750">
</p>

## Overview

This example application demonstrates how one may use Stytch within a Next.js application using the new [Page Router](https://nextjs.org/docs/pages). If you'd like to see an App Router example, check out our [Next.js App Router example](https://github.com/stytchauth/stytch-nextjs13-example).

This project uses Stytch's [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) which provides pre-built UI components, useful React hooks, headless methods to securely interact with Stytch, and is SSR friendly. This project also utilizes Stytch's [Node Backend SDK](https://www.npmjs.com/package/stytch) for authenticating the logged in user's session.

We'd also recommend checking out our [Next.js quickstart guide](https://stytch.com/docs/guides/quickstarts/nextjs), which explains how to incorporate the Stytch authentication concepts demonstrated in this example app into your own Next.js application.

This application features Email Magic Links and Google OAuth authentication. You can use this application's source code as a learning resource, or use it as a jumping off point for your own project. We are excited to see what you build with Stytch!

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and click **Enable SDK**.

3. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and enable login for Google in the Test environment. Config will be done for you automatically in Test.

   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

4. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/stytch-nextjs-example.git
cd stytch-nextjs-example
# Install dependencies, you may use either pnpm or npm.
pnpm i
# or
npm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
pnpm run dev
# or
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.

## Next steps

This example app showcases a small portion of what you can accomplish with Stytch. Here are a few ideas to explore:

1. Add additional login methods like [Passwords](https://stytch.com/docs/guides/passwords/sdk).
2. Replace the prebuilt UI with your own using by using the SDK's [headless methods](https://stytch.com/docs/sdks/javascript-sdk).
3. Replace the Google OAuth button with the high converting [Google One Tap UI](https://stytch.com/docs/guides/oauth/sdk).
4. Secure your app further by building MFA authentication using methods like [WebAuthn](https://stytch.com/docs/sdks/javascript-sdk/webauthn).

## Get help and join the community

#### :speech_balloon: Stytch community Slack

Join the discussion, ask questions, and suggest new features in our ​[Slack community](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).

</details>
