import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection }
  } = context

  const { body } = event

  if (!body) {
    return {
      statusCode: 400,
      body: "Missing body"
    }
  }

  const { email, name } = JSON.parse(body)

  await connection.execute("INSERT INTO users (email, name) VALUES (?, ?)", [
    email,
    name
  ])

  return {
    statusCode: 201
  }
})

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
