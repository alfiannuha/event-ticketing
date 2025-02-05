# Event Ticketing

This Is A Simple Event Ticketing System Built With Next.js, TypeScript, And Tailwind CSS

## Getting Started

This project is a simple event ticketing system. It allows users to create events and sell tickets for those events. It is built with Next.js, TypeScript, and Tailwind CSS.

### Features

- Create events
- Sell tickets for events
- View events
- View tickets
- View event details
- View ticket details

### Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Firebase
- Shadcn/UI

### Installation

First, clone the repository:

```bash
git clone https://github.com/alfiannuha/event-ticketing.git
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
recomended to use `pnpm` for better performance

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
NEXT_FIREBASE_API_KEY=
NEXT_FIREBASE_AUTH_DOMAIN=
NEXT_FIREBASE_PROJECT_ID=
NEXT_FIREBASE_STORAGE_BUCKET=
NEXT_FIREBASE_MESSAGE_SENDER_ID=
NEXT_FIREBASE_APP_ID=

NEXTAUTH_SECRET=

NEXT_GOOGLE_CLIENT_ID=
NEXT_GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_MIDTRANS_MERCHANT_ID=
NEXT_PUBLIC_MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
NEXT_PUBLIC_MIDTRANS_SNAP_URL=

OPENAI_API_KEY=
NEXT_GROQ_AI_API_KEY=
NEXT_GEMINI_AI_API_KEY=
```

You can get the Firebase configuration from the Firebase Console. Create a new project and enable Firestore, Authentication, and Storage. Then, create a web app and copy the configuration.

You can get the NextAuth.js secret by following the instructions in the NextAuth.js [documentation](https://next-auth.js.org/).

You can get the Google OAuth client ID and client secret by creating a new project in the Google Cloud Console and enabling the Google OAuth API.

You can get the Midtrans configuration by creating an account on the Midtrans website and creating a new project.

You can get the OpenAI API key by creating an account on the OpenAI website.

You can get the Groq AI API key by creating an account on the Groq AI website.

You can get the Gemini AI API key by creating an account on the Gemini AI website.

### Firebase Configuration

Enable Firestore, Authentication, and Storage in the Firebase Console. Then, create a new web app and copy the configuration to the `.env.local` file. You can follow this [link](https://console.firebase.google.com/u/0/) to create a new project.

### Midtrans Configuration

Create an account on the Midtrans website and create a new project. Then, copy the merchant ID, server key, and client key to the `.env.local` file. You can follow this [link](https://dashboard.midtrans.com/login) to create an account.

### OpenAI Configuration

Create an account on the OpenAI website and copy the API key to the `.env.local` file. You can follow this [link](https://platform.openai.com/docs/overview) to create an account.

### Groq AI Configuration

Create an account on the Groq AI website and copy the API key to the `.env.local` file. You can follow this [link](https://groq.com/) to create an account.

### Gemini AI Configuration

Create an account on the Gemini AI website and copy the API key to the `.env.local` file. You can follow this [link](https://aistudio.google.com/prompts/new_chat) to create an account.

### Usage

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

for better performance use `pnpm` instead of `npm` or `yarn`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

To deploy the project, you can use Vercel, Netlify, or any other hosting provider that supports Next.js.

### Demo

You can view a live demo of the project [here](https://event-ticketing-prod.vercel.app/).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is open source and available under the [MIT License](https://github.com/alfiannuha/event-ticketing/blob/main/LICENSE).